/**  我 */
// findIndex
function findIndex(array, predicate, context) {
  for (var i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findIndex([1, 2, 3, 4], function (item, i, array) {
  if (item == 3) return true;
})) // 2

// findLastIndex
function findLastIndex(array, predicate, context) {
  var length = array.length;
  for (var i = length - 1; i >= 0; i--) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findLastIndex([1, 2, 3, 4], function (item, index, array) {
  if (item == 1) return true;
})) // 0
// createIndexFinder  根据传参决定找findIndex还是findLastIndex
function createIndexFinder(dir) {
  return function (array, predicate, context) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[index], index, array)) return index;
    }
    return -1;
  }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);



// sortedIndex   findIndex 和 findLastIndex 的需求算是结束了，但是又来了一个新需求：在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
// sortedIndex([10, 20, 30], 25); // 2
// 第一版
function sortedIndex(array, obj) {
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (array[mid] < obj) low = mid + 1;
    else high = mid;
  }
  return high;
};
console.log(sortedIndex([10, 20, 30, 40, 50], 35)) // 3


// 第二版本  ？？
function cb(func, context) {
  if (context === void 0) return func;
  return function () {
    return func.apply(context, arguments);
  };
}

function sortedIndex(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context)
  var low = 0, high = array.length;
  while (low < high) {
    var mid = Math.floor((low + high) / 2);

    if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
    else high = mid;
  }
  return high;
};
// 测试用例
// stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{ name: 'stooge1', age: 10 }, { name: 'stooge2', age: 30 }];
var result = sortedIndex(stooges, { name: 'stooge3', age: 20 }, function (stooge) {
  return stooge.age
});
console.log(result) // 1


// indexOf  sortedIndex 也完成了，现在我们尝试着去写一个 indexOf 和 lastIndexOf 函数，学习 findIndex 和 FindLastIndex 的方式，我们写一版：
// 第一版
function createIndexOfFinder(dir) {
  return function (array, item) {
    var length = array.length;
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (array[index] === item) return index;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
var result = indexOf([1, 2, 3, 4, 5], 2);
console.log(result) // 

// 第二版
function createIndexOfFinder(dir) {
  return function (array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      }
      else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);

// 第三版  加入判断是否有NaN的  （传入findIndex的函数  然

function createIndexOfFinder(dir, predicate) {
  return function (array, item, idx) {

    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      }
      else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }

    // 判断元素是否是 NaN
    if (item !== item) {
      // 在截取好的数组中查找第一个满足isNaN函数的元素的下标
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
  }
}

var indexOf = createIndexOfFinder(1, findIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);

// 第二个优化是支持对有序的数组进行更快的二分查找。
// 如果 indexOf 第三个参数不传开始搜索的下标值，而是一个布尔值 true，就认为数组是一个排好序的数组，这时候，就会采用更快的二分法进行查找，这个时候，可以利用我们写的 sortedIndex 函数。
// 在这里直接给最终的源码：
// 第四版
function createIndexOfFinder(dir, predicate, sortedIndex) {
  return function (array, item, idx) {
    var length = array.length;
    var i = 0;
    if (typeof idx == "number") {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(length + idx, 0);
      }
      else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    }
    // 这里说明idx不是数字，那么应该是true或者false  应该是有序数组  用二分法
    else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
      return array[idx] === item ? idx : -1;
    }
    // 这里是不是永远判断不到NaN？？？？
    
    if (item !== item) {
      idx = predicate(array.slice(i, length), isNaN)
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  }
}
var indexOf = createIndexOfFinder(1, findIndex, sortedIndex);
var lastIndexOf = createIndexOfFinder(-1, findLastIndex);