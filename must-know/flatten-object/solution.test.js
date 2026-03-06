const solution = require("./solution");

const tests = [
  {
    explanation: "Basic nested object with one level depth.",
    input: [
      {
        a: 1,
        b: {
          c: 2,
          d: 3
        }
      }
    ],
    output: {
      "a": 1,
      "b.c": 2,
      "b.d": 3
    }
  },
  {
    explanation: "Object with multiple nested levels to test recursive flattening.",
    input: [
      {
        a: {
          b: {
            c: 1
          }
        },
        d: 2
      }
    ],
    output: {
      "a.b.c": 1,
      "d": 2
    }
  },
  {
    explanation: "Object containing arrays to ensure array indices are included in keys.",
    input: [
      {
        a: [1, 2],
        b: {
          c: [3, 4]
        }
      }
    ],
    output: {
      "a.0": 1,
      "a.1": 2,
      "b.c.0": 3,
      "b.c.1": 4
    }
  },
  {
    explanation: "Edge case with empty object.",
    input: [
      {}
    ],
    output: {}
  },
  {
    explanation: "Object containing null and primitive values.",
    input: [
      {
        a: null,
        b: {
          c: true,
          d: "hello"
        }
      }
    ],
    output: {
      "a": null,
      "b.c": true,
      "b.d": "hello"
    }
  }
];

describe("flatten-object", () => {
  // test.each takes your array of objects and runs a test for each one
  test.each(tests)("$explanation", ({ input, output }) => {
    // We use .toEqual() for deep equality of arrays and objects
    expect(solution(...input)).toEqual(output);
  });
});