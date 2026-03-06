# DSA Practice Repository

This repository is used to practice **Data Structures & Algorithms** with a focus on **backend/full-stack interview preparation**.
The goal is to organize problems by **pattern/topic**, maintain **clear notes**, and track **progress consistently**.

---

# Repository Structure

Problems are organized **by pattern/topic**, not by platform.
This helps recognize algorithm patterns quickly during interviews.

```
dsa-practice/
│
├── arrays/
├── hashmap/
├── two-pointers/
├── sliding-window/
├── binary-search/
├── stack/
├── queue/
├── recursion/
├── trees/
├── graphs/
│
├── must-know/
│
├── patterns/
│
├── progress.md
└── README.md
```

---

# Problem Folder Structure

Each problem has its own folder.

```
arrays/
   ├── lc-026-remove-duplicates/
   │      solution.js
   │      notes.md
   │
   ├── lc-189-rotate-array/
          solution.js
          notes.md
```

### Naming Convention

```
lc-<problem-number>-<problem-name>
```

Examples:

```
lc-001-two-sum
lc-003-longest-substring-without-repeating-characters
lc-121-best-time-to-buy-and-sell-stock
```

Benefits:

* sortable
* searchable
* easy to reference during interviews

---

# Solution File Format

Each `solution.js` should contain basic metadata.

Example:

```javascript
// Problem: Two Sum
// Platform: LeetCode
// Problem Number: 1
// Pattern: HashMap
// Time Complexity: O(n)
// Space Complexity: O(n)

function twoSum(nums, target) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]

    if (map.has(diff)) {
      return [map.get(diff), i]
    }

    map.set(nums[i], i)
  }
}
```

---

# Notes File Format

Each problem should have a `notes.md` file containing learning points.

Template:

```
Problem:
Platform:

Pattern:

Key Idea:
Explain the core approach in simple words.

Time Complexity:
O(?)

Space Complexity:
O(?)

Edge Cases:
- empty input
- single element
- duplicates
- negative numbers

Alternative Approaches:

Interview Insight:
Why this pattern works and when to apply it.
```

The goal of notes is **pattern recognition and quick revision**.

---

# Must-Know Problems Folder

Some problems are **core JavaScript interview questions** and not tied to a specific platform.

```
must-know/
   flatten-array/
   flatten-object/
   debounce/
   throttle/
   deep-clone/
   memoize/
   remove-duplicates/
   group-by/
   lru-cache/
```

These problems appear frequently in **frontend and backend interviews**.

---

# Pattern Notes Folder

The `patterns/` folder contains short explanations of common DSA patterns.

Example:

```
patterns/
   hashmap.md
   sliding-window.md
   recursion.md
   binary-search.md
```

Each pattern file should explain:

```
Pattern Name

When to Use

Core Idea

Example Problems
```

This becomes a **quick revision guide before interviews**.

---

# Progress Tracking

Track solved problems inside `progress.md`.

Example:

```
Week 1

[✓] Two Sum
[✓] Remove Duplicates from Sorted Array
[ ] Rotate Array
[ ] Move Zeroes

Week 2

[ ] Longest Substring Without Repeating Characters
[ ] Container With Most Water
```

Goal:

* maintain consistency
* track weekly progress
* identify weak areas

---

# Practice Guidelines

Daily workflow:

1. Read the problem carefully.
2. Think about the approach before coding.
3. Implement the solution.
4. Analyze time and space complexity.
5. Write notes about the pattern and insights.

---

# Focus Areas

Primary topics for backend/full-stack interviews:

* Arrays
* HashMap
* Sliding Window
* Binary Search
* Stack / Queue
* Recursion
* Trees
* Basic Graph Traversal (BFS/DFS)

---

# Objective

Solve problems consistently and focus on **pattern recognition rather than memorizing solutions**.

Target:

```
~100 well understood problems
```

This is sufficient to reach a strong **intermediate DSA level** suitable for most software engineering interviews.
