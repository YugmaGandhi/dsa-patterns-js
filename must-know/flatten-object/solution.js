/**
 * Problem: flatten-object
 * Source: Custom
 * Difficulty: N/A
 * Pattern: Recursion
 * Time Complexity: 
 * Space Complexity:
 */

function solution(object, parent = "", result = {}) {
    for(let key in object) {
        const newKey = parent ? `${parent}.${key}` : key;
        // here this handles array as well if we need to skip arrat we need to add extra condition
        // "!Array.isArray(object[key])"
        if (typeof(object[key]) === 'object' && object[key] !== null) {
            solution(object[key], newKey, result);
        } else {
            result[newKey] = object[key]
        }
    }

    return result;
}

module.exports = solution