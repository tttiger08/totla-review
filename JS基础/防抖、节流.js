// 防抖，即短时间内大量触发同一事件，只会执行一次函数，实现原理为设置一个定时器，约定在xx毫秒后再触发事件处理，每次触发事件都会重新设置计时器，直到xx毫秒内无第二次操作，防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。
function debounce(func, wait) {
  let timeout = null
  return function () {
    // 这句只能放到这里 因为调用的时候  container.onmousemove = debounce(getUserAction, 1000);   debounce返回一个函数，这个函数里面的this  才是container.onmousemove
    let context = this
    var args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

// 节流  防抖是延迟执行，而节流是间隔执行，函数节流即每隔一段时间就执行一次，实现原理为设置一个定时器，约定xx毫秒后执行事件，如果时间到了，那么执行函数并重置定时器
// 节流和防抖的区别在于，防抖每次触发事件都重置定时器，而节流在定时器到时间后再清空定时器


function debounce(func, wait) {
  let timeout = null
  return function () {
    let context = this
    var args = arguments
    if (!timeout) {
      setTimeout(() => { 
        func.apply(context,args)
      }, wait)
    }

  }
}
