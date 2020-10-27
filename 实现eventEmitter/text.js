// events的结构
let _events1 = {
  eventName1: [],
  eventName2: [],
  eventName3: [],
  eventName4: [],
  eventName5: [],
}
class EventEmitter {
  constructor() {
    this._events = Object.create(null); // 定义事件的存储对象
    this._eventsCount = 0;
  }
  //添加事件监听
  on(eventName, fn, isOnce = false) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function!");
    }
    if (!this._events[eventName]) {
      this._events[eventName] = [];
      this._events[eventName].push({
        fn,
        isOnce
      });
    } else {
      this._events[eventName].push({
        fn,
        isOnce
      }); // 存入监听的事件名和事件
    }
  }

  //一次性事件监听
  once(eventName, fn) {
    this.on(eventName, fn, true);
  }

  // 事件触发
  emit(eventName, ...args) {
    if (!this._events[eventName]) {
      return false;
    }
    const len = this._events[eventName].length;
    for (let i = 0; i < len; i++) {
      let event = this._events[eventName][i];
      event.fn.call(this, ...args);
      if (event.isOnce) {
        this.removeListener(eventName, event.fn);
        i--;
      }
    }
  }
  // 移除监听事件
  removeListener(eventName, fn) {
    if (!this._events[eventName]) return this;
    // 如果不传fn  就整个事件都删除掉  也就是所有回调函数都没有了
    if (!fn) {
      // delete  删除对象的某个属性
      delete this._events[eventName];
      return this;
    } else {
      this._events[eventName].forEach((item, index) => {
        if (item.fn === fn) {
          this._events[eventName].splice(index, 1);
        } else {
          return this;
        }
      });
    }
  }
  // off:removeListener 的别名
  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }
  // 移除某一监听事件所有listenr
  removeAllListener(eventName) {
    if (eventName) {
      if (this._events[eventName]) {
        this._events[eventName].length = 0;
      }
    } else {
      this._events = Object.create(null);
    }
  }
}

function add(...args) {
  let num = 0;
  for (let i = 0; i < args.length; i++) {
    num += args[i];
  }
  console.log(num);
  return num;
}

let event = new EventEmitter();
event.on("adding", add);
// event.emit("adding", 1, 2, 3, 4);
// event.removeListener("adding", add);
event.emit("adding", 1, 2, 3, 4);
      // event.once("adding", add);
      // event.emit("adding", 1, 2, 3, 4);
      // event.emit("adding", 1, 2, 3, 4);