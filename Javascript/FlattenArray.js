const flattenRecursive = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }
    const result = [];
    for (const ele of arr) {
        if (Array.isArray(ele)) {
            result.push(...flattenRecursive(ele)); //tail recursion
        } else {
            result.push(ele);
        }
    }
    return result;
};

let ans = []
const arr = [1,[2,3]]
console.log(flattenRecursive(arr))