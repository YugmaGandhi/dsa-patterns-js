const solution = require("./solution");

const tests = [
  {
    "explanation": "A standard happy-path scenario with a mix of elements and single-level nesting.",
    "input": [
      [
        1,
        [2,
        3]
      ]
    ],
    "output": [
      1,
      2,
      3
    ]
  },
  {
    "explanation": "A complex scenario featuring multiple layers of nesting and varying structures.",
    "input": [
      [
        [1,
        [2,
        [3],
        4,
        5],
        6]
      ]
    ],
    "output": [
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "explanation": "A tricky edge case involving empty arrays, negative numbers, and zero.",
    "input": [
      [
        [1,
        -2,
        -3],
        0
      ]
    ],
    "output": [
      1,
      -2,
      -3,
      0
    ]
  }
];

describe("flatten-array", () => {
  // test.each takes your array of objects and runs a test for each one
  test.each(tests)("$explanation", ({ input, output }) => {
    // We use .toEqual() for deep equality of arrays and objects
    expect(solution(...input)).toEqual(output);
  });
});