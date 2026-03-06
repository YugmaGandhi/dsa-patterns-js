require("dotenv").config()

const fs = require("fs")
const path = require("path")
const axios = require("axios")
const inquirer = require("inquirer")
const slugify = require("slugify")
const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const testCaseSchema = z.object({
    explanation: z.string().describe("A brief explanation of what specific scenario or edge case this test covers."),
    input: z.array(z.any()).describe("The exact input array/arguments for the test case."),
    output: z.any().describe("The expected output for the test case."),
});

const testCasesSchema = z.array(testCaseSchema).describe("An array of exactly 3 test cases.");

async function fetchLeetCodeList() {

    const res = await axios.get(
        "https://leetcode.com/api/problems/all/"
    )

    return res.data.stat_status_pairs
}

async function getProblemById(id) {

    const list = await fetchLeetCodeList()

    const problem = list.find(
        p => p.stat.frontend_question_id == id
    )

    if (!problem) return null

    return {
        id,
        title: problem.stat.question__title,
        slug: problem.stat.question__title_slug,
        difficulty: ["Easy", "Medium", "Hard"][
            problem.difficulty.level - 1
        ]
    }
}

async function generateTestCases(title) {
    // Enhanced prompt to guide the AI toward high-quality, varied test cases
    const prompt = `
You are an expert competitive programming judge creating test cases for a problem titled "${title}".

Generate exactly 3 distinct and high-quality test cases:
1. Test Case 1: A standard, basic happy-path scenario.
2. Test Case 2: A complex scenario (e.g., larger inputs, heavy nesting).
3. Test Case 3: A tricky edge case (e.g., empty inputs, negative numbers).

IMPORTANT: Return a JSON array of objects. Each object MUST strictly adhere to this format and use these exact keys:
- "explanation": A string explaining what the test covers.
- "input": The actual array. DO NOT wrap the array in quotes. It must be a valid JSON array.
- "output": The expected output. DO NOT use the key "expected".

Example output format:
[
  {
    "explanation": "Testing a heavily nested array with empty arrays.",
    "input": [1, [[2]], [], [3, 4]],
    "output": [1, 2, 3, 4]
  }
]
`;

    const ai = new GoogleGenAI({});

    const response = await ai.models.generateContent({
        // Note: ensure you are using a valid Gemini model string in your setup, like "gemini-2.5-flash"
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(testCasesSchema),
        },
    });

    try {
        const testCases = testCasesSchema.parse(JSON.parse(response.text));
        const sanitizedTests = testCases.map(t => ({
            ...t,
            // If the array has multiple items but the first item is a primitive (like a number), wrap it!
            input: (t.input.length > 1 && typeof t.input[0] !== "object") ? [t.input] : t.input
        }));

        return sanitizedTests;
    } catch (error) {
        console.error("Failed to parse AI response. The AI might have returned malformed JSON.");
        console.log("Raw Output:", response.text);
        // Return empty array or generic fallback so the script can finish creating the files
        return [];
    }
}

function readTemplate(file) {

    return fs.readFileSync(
        path.join(__dirname, "..", "templates", file),
        "utf-8"
    )
}

function replaceVars(template, vars) {

    let result = template

    Object.keys(vars).forEach(k => {
        result = result.replace(
            new RegExp(`{{${k}}}`, "g"),
            vars[k]
        )
    })

    return result
}

async function run() {

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "source",
            message: "Problem source",
            choices: ["LeetCode", "Custom"]
        },
        {
            type: "input",
            name: "id",
            message: "LeetCode problem number",
            when: a => a.source === "LeetCode"
        },
        {
            type: "input",
            name: "title",
            message: "Problem title",
            when: a => a.source === "Custom"
        },
        {
            type: "list",
            name: "topic",
            message: "Select topic",
            choices: [
                "arrays",
                "hashmap",
                "two-pointers",
                "sliding-window",
                "binary-search",
                "stack",
                "queue",
                "recursion",
                "trees",
                "graphs",
                "must-know"
            ]
        }
    ])

    let problem

    if (answers.source === "LeetCode") {

        problem = await getProblemById(answers.id)

        if (!problem) {
            console.log("Problem not found")
            return
        }

    } else {

        problem = {
            title: answers.title,
            difficulty: "N/A",
            id: "custom"
        }
    }

    const slug = slugify(problem.title, { lower: true })

    const folderName =
        answers.source === "LeetCode"
            ? `lc-${problem.id}-${slug}`
            : slug

    const basePath = path.join(
        process.cwd(),
        answers.topic,
        folderName
    )

    if (fs.existsSync(basePath)) {
        console.log("Problem already exists")
        return
    }

    fs.mkdirSync(basePath, { recursive: true })

    const tests = await generateTestCases(problem.title)

    const solutionTemplate = readTemplate(
        "solution.template.js"
    )

    const notesTemplate = readTemplate(
        "notes.template.md"
    )

    const testTemplate = readTemplate(
        "test.template.js"
    )

    const vars = {
        title: problem.title,
        source: answers.source,
        difficulty: problem.difficulty,
        tests: JSON.stringify(tests, null, 2)
    }

    fs.writeFileSync(
        path.join(basePath, "solution.js"),
        replaceVars(solutionTemplate, vars)
    )

    fs.writeFileSync(
        path.join(basePath, "notes.md"),
        replaceVars(notesTemplate, vars)
    )

    fs.writeFileSync(
        path.join(basePath, "solution.test.js"),
        replaceVars(testTemplate, vars)
    )

    fs.appendFileSync(
        "progress.md",
        `[ ] ${problem.title}\n`
    )

    console.log("Problem created:", folderName)
}

run()