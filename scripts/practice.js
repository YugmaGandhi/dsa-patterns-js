require("dotenv").config();
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const PRACTICE_DIR = path.join(process.cwd(), "__practice__");

// List of topics to scan (matches your generation script)
const topics = [
    "arrays", "hashmap", "two-pointers", "sliding-window", 
    "binary-search", "stack", "queue", "recursion", 
    "trees", "graphs", "must-know"
];

function getAllProblems() {
    let allProblems = [];

    topics.forEach(topic => {
        const topicPath = path.join(process.cwd(), topic);
        if (fs.existsSync(topicPath)) {
            const folders = fs.readdirSync(topicPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            folders.forEach(folder => {
                allProblems.push({
                    topic,
                    name: folder,
                    fullPath: path.join(topicPath, folder)
                });
            });
        }
    });

    return allProblems;
}

function generatePracticeSkeleton(originalSolutionPath) {
    if (!fs.existsSync(originalSolutionPath)) return "";

    const content = fs.readFileSync(originalSolutionPath, "utf-8");
    
    // Attempt to extract function name and module.exports
    // This assumes your solution.js looks roughly like:
    // function myAlgo(nums) { ... }
    // module.exports = myAlgo;
    
    const funcMatch = content.match(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/);
    const exportMatch = content.match(/module\.exports\s*=\s*[a-zA-Z0-9_]+/);

    if (funcMatch && exportMatch) {
        return `// Practice Session\n\nfunction ${funcMatch[1]}(${funcMatch[2]}) {\n  // Write your code here\n  \n}\n\n${exportMatch[0]};\n`;
    }

    // Fallback if regex fails to match
    return `// Practice Session\n// Check the test file for the expected function name and arguments.\n\nmodule.exports = {};\n`;
}

async function runPractice() {
    const problems = getAllProblems();

    if (problems.length === 0) {
        console.log("No problems found to practice!");
        return;
    }

    // Optional: Ask user if they want a totally random problem or a specific topic
    const { mode } = await inquirer.prompt([
        {
            type: "list",
            name: "mode",
            message: "How do you want to practice?",
            choices: ["Completely Random", "Pick a Topic"]
        }
    ]);

    let selectedProblems = problems;

    if (mode === "Pick a Topic") {
        const { selectedTopic } = await inquirer.prompt([
            {
                type: "list",
                name: "selectedTopic",
                message: "Which topic?",
                choices: topics.filter(t => problems.some(p => p.topic === t))
            }
        ]);
        selectedProblems = problems.filter(p => p.topic === selectedTopic);
    }

    const randomProblem = selectedProblems[Math.floor(Math.random() * selectedProblems.length)];

    // Setup Practice Directory
    if (!fs.existsSync(PRACTICE_DIR)) {
        fs.mkdirSync(PRACTICE_DIR);
    }

    const originalTestPath = path.join(randomProblem.fullPath, "solution.test.js");
    const originalSolutionPath = path.join(randomProblem.fullPath, "solution.js");
    const originalNotesPath = path.join(randomProblem.fullPath, "notes.md");

    // Copy tests over
    if (fs.existsSync(originalTestPath)) {
        fs.copyFileSync(originalTestPath, path.join(PRACTICE_DIR, "solution.test.js"));
    } else {
        console.log(`Warning: No test file found for ${randomProblem.name}`);
    }

    // Generate empty skeleton
    const skeleton = generatePracticeSkeleton(originalSolutionPath);
    fs.writeFileSync(path.join(PRACTICE_DIR, "solution.js"), skeleton);

    console.log("\n========================================");
    console.log(`🎯 Practice Time!`);
    console.log(`📁 Topic: ${randomProblem.topic}`);
    console.log(`🧩 Problem: ${randomProblem.name}`);
    console.log("========================================\n");
    
    // If you want to quickly remind yourself of the problem description without looking at the solution:
    if (fs.existsSync(originalNotesPath)) {
        console.log("💡 Tip: You can read the original prompt in:");
        console.log(`   ${originalNotesPath}\n`);
    }

    console.log("👉 Go to the __practice__ folder to write your solution.");
    console.log("🏃 Run `npm run practice` to start the test watcher.\n");
}

runPractice();