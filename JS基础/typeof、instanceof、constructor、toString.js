/*
  储备知识
  js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息
    000：对象
    010：浮点数
    100：字符串
    110：布尔
    1：整数
  但是  undefined 和 null  比较特殊  
    null:所有机器码均为0   (所以typeof 判断null也会误认为是对象)
    undefine:  用 −2^30 整数来表示
*/

// typeof   一般拿来判断基本数据类型 因为他判断null也会认为是对象  且typeof 在判断一个 object的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object

// instanceof 判断一个数据具体是哪一种 object 的时候，我们需要利用 instanceof 这个操作符来判断
/* 
实现原理
只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。
    原型链三点原则
        1.每个对象都有__proto__属性指向其原型
        2.构造函数的prototype属性指向实例原型
        3.原型的constructor 属性指向构造函数
    只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false
*/
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false;
    }
    if (leftVaule === rightProto) {
      return true;
    }
    leftVaule = leftVaule.__proto__
  }
}
// 举个栗子
function Foo() {
}
// Foo.prototype  (__proto__) Object.prototype 
// Function.prototype (__proto__)   Object.prototype 
// https://juejin.im/post/5b0b9b9051882515773ae714

Object instanceof Object // true  
    leftValue = Object.__proto__ = Function.prototype;
    rightValue = Object.prototype;
    // 第一次判断
    leftValue != rightValue
    leftValue = Function.prototype.__proto__ = Object.prototype
    // 第二次判断
    leftValue === rightValue
    // 返回 true

Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true

// constructor  
// 当一个函数 Animal被定义时，JS引擎会为F添加 prototype 原型，然后再在 prototype上添加一个 constructor 属性，并让其指向 Animal构造函数
const Animal = function (name) {this.name = name};   // 声明一个构造函数
// 当执行 var dog = new Animal() 时，Animal 被当成了构造函数，dog 是Animal的实例对象，此时 dog原型上的 constructor 传递到了 dog 上，因此 dog.constructor == Animal
let dog = new Animal('dog'); // 生成实例dog
/*
**********************************************************************************************************
***********************************************************************************************************
***********************************************************************************************************
可以看出，F 利用原型对象上的 constructor 引用了自身，当 F 作为构造函数来创建对象时，原型上的 constructor 就被遗传到了新创建的对象上， 从原型链角度造函数 F 就是新对象的类型。这样做的意义是，让新对象在诞生以后，就具有可追溯的数据类型。
************************************************************************************************************
************************************************************************************************************
***********************************************************************************************************
*/
// https://www.cnblogs.com/onepixel/p/5126046.html
console.log(dog.constructor ===Animal)  // true
// 细节问题
// 1. null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
// 2. 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object




// // toString
// toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。
// 对于 Object 对象，直接调用 toString()  就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。
Object.prototype.toString.call(1) // "[object Number]"

Object.prototype.toString.call('hi') // "[object String]"

Object.prototype.toString.call({a:'hi'}) // "[object Object]"

Object.prototype.toString.call([1,'a']) // "[object Array]"

Object.prototype.toString.call(true) // "[object Boolean]"

Object.prototype.toString.call(() => {}) // "[object Function]"

Object.prototype.toString.call(null) // "[object Null]"

Object.prototype.toString.call(undefined) // "[object Undefined]"

Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"

