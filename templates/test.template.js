const solution = require("./solution");

const tests = {{tests}};

describe("{{title}}", () => {
  // test.each takes your array of objects and runs a test for each one
  test.each(tests)("$explanation", ({ input, output }) => {
    // We use .toEqual() for deep equality of arrays and objects
    expect(solution(...input)).toEqual(output);
  });
});