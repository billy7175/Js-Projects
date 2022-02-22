console.log('TEST01 is connected');
const arr = [[1,2,3],[4,5,6],[7,8,9]];
console.log(arr.flat());

const arrDeep = [[[1,2],3], [4,[5,6]],7,8];
console.log(arr.map(a => a).flat().reduce((acc, mov) =>acc+mov, 0));