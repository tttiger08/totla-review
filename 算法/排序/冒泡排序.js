function bubbleSort(arr){
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}



// 优化版本：
// 冒泡排序总会执行(N-1)+(N-2)+(N-3)+..+2+1趟，但如果运行到当中某一趟时排序已经完成，或者输入的是一个有序数组，那么后边的比较就都是多余的，为了避免这种情况，我们增加一个flag，判断排序是否在中途就已经完成（也就是判断有无发生元素交换）
function bubbleSort(arr){
  for(let i = 0; i < arr.length; i++) {
  let flag = true
    for(let j = 0; j < arr.length - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        flag = false
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
    // 这个flag的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成
    if(flag)break;
  }
  return arr
}

