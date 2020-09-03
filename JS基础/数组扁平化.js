// 测试用例 
const arr = [1, [1, 2], [1, 2, 3]]
// 1.ES6的flat()  flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
console.log(arr.flat(Infinity))  // [1, 1, 2, 1, 2, 3]

// 2.序列化后正则
const str = `[${JSON.stringify(arr).replace(/(\[|\])/g, '')}]`
console.log(JSON.parse(str))  // [1, 1, 2, 1, 2, 3]

// 3.递归
// 对于树状结构的数据，最直接的处理方式就是递
function flat(arr) {
  let result = []
  for (const item of arr) {
    item instanceof Array ? result = result.concat(flat(item)) : result.push(item)
  }
  return result
}
console.log(flat(arr)) // [1, 1, 2, 1, 2, 3]



// 4.reduce()递归
// reducer 函数接收4个参数:
// 这个是传入reduce中的函数锁接收的参数
// Accumulator (acc) (累计器)
// Current Value (cur) (当前值)
// Current Index (idx) (当前索引)
// Source Array (src) (源数组)


// callback
// 执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：
// accumulator
// 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

// currentValue
// 数组中正在处理的元素。
// index 可选
// 数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
// array可选
// 调用reduce()的数组
// initialValue可选
// 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
function flat(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(cur instanceof Array ? flat(cur) : cur)
  }, [])
}
console.log(flat(arr)) // [1, 1, 2, 1, 2, 3]


// 5.迭代+展开运算符
// / 每次while都会合并一层的元素，这里第一次合并结果为[1, 1, 2, 1, 2, 3, [4,4,4]]
// 然后arr.some判定数组中是否存在数组，因为存在[4,4,4]，继续进入第二次循环进行合并
while(arr.some(Array.isArray)) {
  arr = [].concat(...arr)
}