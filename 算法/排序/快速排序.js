// 步骤：
// 选取基准元素
// 比基准元素小的元素放到左边，大的放右边
// 在左右子数组中重复步骤一二，直到数组只剩下一个元素
// 向上逐级合并数组

function quickSort(arr) {
  if(arr.length <= 1) return arr          //递归终止条件
  const pivot = arr.length / 2 | 0        //基准点
  // splice第一个参数如果传入的是小数  直接舍弃小数点后面的那部分
  const pivotValue = arr.splice(pivot, 1)[0]
  const leftArr = []
  const rightArr = []
  arr.forEach(val => {
    // 取出基准值之后 如果val大于基准值，放在右边，否则放左边
      val > pivotValue ? rightArr.push(val) : leftArr.push(val)
  })
  // 通过递归的方式，继续对数组进行排序
  return [ ...quickSort(leftArr), pivotValue, ...quickSort(rightArr)]
}


// 优化：由于上面那个快排，每一次调用快排，都得开两个数组，会消耗很多内存空间，数据量大的时候可能造成内存溢出。  改进  即是原地排序。

// function quickSort(arr, left, right) {          //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置  （即在大数组中下标区分出小数组来）
//   if (left < right) {
//       let pos = left - 1                      //pos即“被置换的位置”，第一趟为-1
//       for(let i = left; i <= right; i++) {    //循环遍历数组，置换元素
//           let pivot = arr[right]              //选取数组最后一位作为基准数，
//           if(arr[i] <= pivot) {               //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
//               pos++
//               let temp = arr[pos]
//               arr[pos] = arr[i]
//               arr[i] = temp
//           }
//       }
//       //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
//       quickSort(arr, left, pos - 1)        
//       quickSort(arr, pos + 1, right)
//   }
//   return arr      //数组只包含1或0个元素时(即left>=right)，递归终止
// }

// //使用
// var arr = [5,1,4,2,3]
// var start = 0;
// var end = arr.length - 1;
// quickSort(arr, start, end)

// 还有三路排序  
// 推荐看文章图片  https://juejin.im/post/5e8b261ae51d4546c0382ab4#heading-52