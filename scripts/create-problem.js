const fs = require("fs");
const path = require("path");

const [,, topic, problemName] = process.argv;

if (!topic || !problemName) {
  console.log("Usage: npm run new <topic> <problem-name>");
  process.exit(1);
}

const basePath = path.join(__dirname, "..", topic, problemName);

if (fs.existsSync(basePath)) {
  console.log("Problem already exists.");
  process.exit(1);
}

fs.mkdirSync(basePath, { recursive: true });

const solutionTemplate = `// Problem: ${problemName}
// Pattern:
// Time Complexity:
// Space Complexity:

function solution() {

}
`;

const notesTemplate = `# ${problemName}

## Pattern

## Key Idea

Explain the core logic.

## Time Complexity

## Space Complexity

## Edge Cases

- empty input
- single element

## Interview Notes
`;

fs.writeFileSync(path.join(basePath, "solution.js"), solutionTemplate);
fs.writeFileSync(path.join(basePath, "notes.md"), notesTemplate);

console.log("Problem created successfully!");