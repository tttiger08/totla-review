// 归并排序和快排的思路类似，都是递归分治，区别在于快排边分区边排序，而归并在分区完成后才会排序


function mergeSort(arr) {
  if (arr.length <= 1) return arr		//数组元素被划分到剩1个时，递归终止
  // arr.length / 2 | 0   大于1   返回整数  小于1  返回0
  const midIndex = arr.length / 2 | 0
  // slice  不影响原数组，  第一个参数为开始位置，第二个参数为结束位置。返回提取的集合，不包括end的值   
  // splice  影响原数组，第一个参数为开始的地方，第二个参数为删除的个数，返回被删除部分的集合。
  const leftArr = arr.slice(0, midIndex)
  const rightArr = arr.slice(midIndex, arr.length)
  return merge(mergeSort(leftArr), mergeSort(rightArr))	//先划分，后合并
}

//合并
function merge(leftArr, rightArr) {
  const result = []
  while (leftArr.length && rightArr.length) {
    leftArr[0] <= rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift())
  }
  while (leftArr.length) result.push(leftArr.shift())
  while (rightArr.length) result.push(rightArr.shift())
  // 最底层返回的result的只是两个值，是一层一层递归出去的。
  return result
}

// 自己手写
function merge(leftArr, rightArr) {
  const result = []
  while (leftArr.length && rightArr.length) {
    leftArr[0] < rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift())
  }
  if(leftArr.length) result.concat(leftArr)
  if(rightArr.length) result.concat(rightArr)
  return result
}

function mergeSort(arr) {
  if(arr.length <=1) return arr
  let midIndex = arr.length/2 |0
  const leftArr = arr.slice(0,midIndex)
  const rightArr = arr.slice(midIndex,arr.length)
  return merge(mergeSort(leftArr),mergeSort(rightArr))
}
