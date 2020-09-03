/*
  JS之深浅拷贝
  concat,slice方法
  如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。
  我们把这种复制引用的拷贝方法称之为浅拷贝，与之对应的就是深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会  影响另一个。
*/
// 浅拷贝之  slice  concat  
var arr = ['old', 1, true, null, undefined];
var new_arr = arr.concat();  //slice   var new_arr = arr.slice();
new_arr[0] = 'new';
console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]

// 深拷贝之   JSON.stringify  JSON.parse(不能拷贝函数会出错)
var arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]
var new_arr = JSON.parse(JSON.stringify(arr));
console.log(new_arr);

// 实现一个浅拷贝
var shallowCopy = function (obj) {
  //只拷贝对象
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  // 如果obj是数组 那么返回的key 会是索引   如果是对象，key就是属性名
  for (let key in obj) {
    //遍历，并且判断是obj的属性才拷贝
    if(obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 实现深拷贝
var deepCopy = function (obj) {
  //只拷贝对象
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  // 如果obj是数组 那么返回的key 会是索引   如果是对象，key就是属性名
  for (let key in obj) {
    //遍历，并且判断是obj的属性才拷贝
    if(obj.hasOwnProperty(key)) {
      // 判断是否是对象 是的话递归调用,遍历到不是对象为止
      newObj[key] = typeof obj[key] === 'object'? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}

// 浅拷贝：  一般用Object.assign   或者剩余参数  ...a (a为对象)
// 深拷贝:  递归解决    先stringfy  后parse的方法