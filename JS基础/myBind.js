// ...args 剩余参数  语法允许我们将一个不定数量的参数表示为一个数组。
Function.prototype.myBind = function(someObj,...args) {
  let self = this 
  var fbound = function() {
    // 用call(arguments) 使类数组转变为数组  既可以在bind的时候传参  也可以在bind完返回的参数里面传参
    return self.apply(this instanceof self?this:someObj,args.concat(Array.prototype.slice.call(arguments)))
  }
   // 继承原型上的属性和方法   Object.create浅拷贝的方式，使之修改fbound的prototype的时候u不会影响到self.prototype
  fbound.prototype = Object.create(self.prototype)
  return fbound
}


// 测试
const obj = { name: '写代码像蔡徐抻' }
function foo() {
    console.log(this.name)
    console.log(arguments)
}

foo.myBind(obj, 'a', 'b', 'c')()    //输出写代码像蔡徐抻 ['a', 'b', 'c']

