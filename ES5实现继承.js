// 1、原型链继承
// 父类
function Parent() {
  // 由于所有Child实例原型都指向同一个Parent实例, 因此对某个Child实例的父类引用类型变量修改会影响所有的Child实例  引用才会变 原始值不会变
  // 因为引用的话 只是子类存放指针的地址不同，但是两个不同的指针指向了同一个对象  所以修改了某一个指针对应的对象  就会改变了这个对象！！
  this.name = {a:'写代码像蔡徐抻'}
}
// 父类的原型方法
Parent.prototype.getName = function() {
  return this.name
}
// 子类
function Child() {}

// 让子类的原型对象指向父类实例, 这样一来在Child实例中找不到的属性和方法就会到原型对象(父类实例)上寻找
Child.prototype = new Parent()
Child.prototype.constructor = Child // 根据原型链的规则,顺便绑定一下constructor, 这一步不影响继承, 只是在用到constructor时会需要

// 然后Child实例就能访问到父类及其原型上的name属性和getName()方法
const child = new Child()
child.name.a = 'tiger'
const child2 = new Child()
console.log(child.name.a)          // '写代码像蔡徐抻'
console.log(child2.name.a)          
// 缺点：由于所有Child实例原型都指向同一个Parent实例, 因此对某个Child实例的父类引用类型变量修改会影响所有的Child实例






// 2、构造函数继承
// 作用 构造函数继承，即在子类的构造函数中执行父类的构造函数，并为其绑定子类的this，让父类的构造函数把成员属性和方法都挂到子类的this上去，这样既能避免实例之间共享一个原型实例，又能向父类构造方法传参
function Parent(name) {
  this.name = [name]
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  Parent.call(this, 'zhangsan')   // 执行父类构造方法并绑定子类的this, 使得父类中的属性能够赋到子类的this上
}

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // 报错,找不到getName(), 构造函数继承的方式继承不到父类原型上的属性和方法
// 缺点：无法继承父类原型上的属性和方法







// 3、组合继承
// 作用： 既然原型链继承和构造函数继承各有互补的优缺点, 那么我们为什么不组合起来使用呢, 所以就有了综合二者的组合式继承
function Parent(name) {
  this.name = [name]
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan') 
}
//原型链继承
Child.prototype = new Parent()
Child.prototype.constructor = Child

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // ['zhangsan']
// 缺点：每次创建子类实例都执行了两次构造函数(Parent.call()和new Parent())，虽然这并不影响对父类的继承，但子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅






// 4、 寄生式组合继承
// 作用：为了解决构造函数被执行两次的问题, 我们将指向父类实例改为指向父类原型, 减去一次构造函数的执行
function Parent(name) {
  this.name = [name]
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan') 
}
//原型链继承
// Child.prototype = new Parent()
Child.prototype = Parent.prototype  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child

//测试
const child1 = new Child()
const child2 = new Child()
child1.name[0] = 'foo'
console.log(child1.name)          // ['foo']
console.log(child2.name)          // ['zhangsan']
child2.getName()                  // ['zhangsan']
// 缺点：但这种方式存在一个问题，由于子类原型和父类原型指向同一个对象，我们对子类原型的操作会影响到父类原型，例如给Child.prototype增加一个getName()方法，那么会导致Parent.prototype也增加或被覆盖一个getName()方法，为了解决这个问题，我们给Parent.prototype做一个浅拷贝

// 改进版本
function Parent(name) {
  this.name = [name]
}
Parent.prototype.getName = function() {
  return this.name
}
function Child() {
  // 构造函数继承
  Parent.call(this, 'zhangsan') 
}
//原型链继承
// Child.prototype = new Parent()
// 这种方式是浅拷贝
Child.prototype = Object.create(Parent.prototype)  //将`指向父类实例`改为`指向父类原型`
Child.prototype.constructor = Child

//测试
const child = new Child()
const parent = new Parent()
child.getName()                  // ['zhangsan']
parent.getName()                 // 报错, 找不到getName()



