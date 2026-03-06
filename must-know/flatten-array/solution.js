/**
 * Problem: flatten-array
 * Source: Custom
 * Difficulty: N/A
 * Pattern:
 * Time Complexity:
 * Space Complexity:
 */

function solution(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(solution(arr[i]))
        } else {
            result.push(arr[i]);
        }
    }

    return result
}

module.exports = solution