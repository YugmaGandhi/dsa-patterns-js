# flatten-array

Platform: Custom  
Difficulty: N/A

## Pattern
Recursion

## Key Idea
The given array can be nested, and we do not know how deep the nesting is.  
Because of this, recursion is a good approach.

We iterate through the array elements.

- If the current element is **not an array**, we directly push it into the result.
- If the element **is an array**, we recursively call the same function to flatten that array.

The recursive call will return a flattened array, which we then **concatenate with our result array**.

## Pseudo Code

function flatten(arr):

    create result array

    for each element in arr
        if element is array
            result = result.concat(flatten(element))
        else
            result.push(element)

    return result

return result

## Example Flow

flatten([1, [2, 3]])
           |
           ↓
flatten([2,3]) → returns [2,3]

result = [1].concat([2,3])


## Time Complexity
O(n)

Each element in the array is visited once.

## Space Complexity
O(d)

Where **d** is the maximum depth of recursion (call stack).

## Edge Cases

- empty input
- deeply nested arrays
- duplicates
- negative numbers
- null or undefined values inside arrays

## Interview Notes

- Ask whether nested arrays can contain different data types.
- Clarify whether built-in functions like `Array.flat()` are allowed.
- If recursion is not preferred, this problem can also be solved using a **stack-based iterative approach**.