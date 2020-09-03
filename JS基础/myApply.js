// apply接收的是一个数组，
Function.prototype.myApply =function (someObj,args) {
  const fn = Symbol('fn')
  someObj = someObj || window
  someObj[fn] = this
  const result = someObj[fn](...args)
  delete someObj[fn]
  return result
}


// 测试
function foo(a,b) {
  console.log(this.name)
  console.log("---------",a+b)
}

const obj = {
  name: '写代码像蔡徐抻'
}
foo.myApply(obj,[1,2])