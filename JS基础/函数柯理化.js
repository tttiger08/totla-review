/**
 * 函数柯理化
 * 定义：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
 * 
 */


// 第一版
var curry = fn => {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
};
// 测试用例
function add(a, b) {
  return a + b;
}
var addCurry = curry(add, 1, 2);
addCurry() // 3
//或者
var addCurry = curry(add, 1);
addCurry(2) // 3
//或者
var addCurry = curry(add);
addCurry(1, 2) // 3


// 第二版
function curry(fn, args) {
  // fn.length  返回的是参数的个数
  var length = fn.length;
  args = args || [];
  return function () {
    var _args = args.slice(0),
      arg, i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}
// 测试用例
var fn = curry((a, b, c) => {
  return [a, b, c];
});
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

// 第三版（还没掌握）
/**
 * curry 函数写到这里其实已经很完善了，但是注意这个函数的传参顺序必须是从左到右，根据形参的顺序依次传入，如果我不想根据这个顺序传呢？
 * 我们可以创建一个占位符，比如这样：
 * 
 */
var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});
fn("a", _, "c")("b") // ["a", "b", "c"]
function curry(fn, args, holes) {
  length = fn.length;
  args = args || [];
  holes = holes || [];
  return function () {
    var _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg, i, index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen)
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1)
        }
      }
      else {
        _args.push(arg);
      }

    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    }
    else {
      return fn.apply(this, _args);
    }
  }
}

var _ = {};
var fn = curry(function (a, b, c, d, e) {
  console.log([a, b, c, d, e]);
});
// 验证 输出全部都是 [1, 2, 3, 4, 5]
fn(1, 2, 3, 4, 5);
fn(_, 2, 3, 4, 5)(1);
fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
fn(1, _, _, 4)(_, 3)(2)(5);
fn(_, 2)(_, _, 4)(1)(3)(5)