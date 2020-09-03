function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    // (previousPromise, nextPromise) =>  previousPromise.then(() => nextPromise()),  这种不用return  直接返回 箭头后面得
    (previousPromise, nextPromise) => { return previousPromise.then(() => nextPromise())}, // 此处加了中括号要  是函数体了 要写return  
    Promise.resolve()
  );
}

// 测试
const createPromise = (time, id) => () =>
  new Promise(resolve =>
    setTimeout(() => {
      console.log("promise", id);
      resolve();
    }, time)
  );

runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]);
// new promise 要有resolve才能调用then
// const a = new Promise()
// a.then()...

// function runPromiseByQueue(myPromises) { 
//   myPromises.reduce((prevPromise, nextPromise) => 
//     prevPromise.then(nextPromise.bind(this)), Promise.resolve()); 
// } 

// const createPromise = (time, id) => { 
//   return new Promise(resolve => { 
//     setTimeout(() => { 
//       console.log('promise', id); 
//       resolve(); 
//     }, time); 
//   }) 
// } 
// runPromiseByQueue([ 
//   createPromise.bind(this, 3000, 1), 
//   createPromise.bind(this, 2000, 2), 
//   createPromise.bind(this, 1000, 3) 
// ]);