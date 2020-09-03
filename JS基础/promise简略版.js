function Promise(fn) {
  // Promise resolve时的回调函数集
  this.cbs = [];

  // 传递给Promise处理函数的resolve
  // 这里直接往实例上挂个data
  // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
  const resolve = (value) => {
    // 注意promise的then函数需要异步执行
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  }

  // 执行用户传入的函数 
  // 并且把resolve方法交给用户执行
  fn(resolve.bind(this));
}

Promise.prototype.then = function (onResolved) {
  // 这里叫做promise2
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        // resolve的权力被交给了user promise
        res.then(resolve);
      } else {
        // 如果是普通值 就直接resolve
        // 依次执行cbs里的函数 并且把值传递给cbs
        resolve(res);
      }
    });
  });
};