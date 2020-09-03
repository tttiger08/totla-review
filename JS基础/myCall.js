Function.prototype.myCall = (someObj,...args) => {
  const fn = Symbol('fn')
  someObj = someObj || window
  someObj[fn] = this
  const result = someObj[fn](...args)
  delete someObj[fn]
  return result
}


// 测试
function foo() {
  console.log(this.name)
}

const obj = {
  name: '写代码像蔡徐抻'
}
foo.myCall(obj)