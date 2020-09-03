// node环境跟浏览器输出的结果有误差。
/**
 * macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
 * micro-task(微任务)：Promise，process.nextTick
 * 执行流程就是 
 * ①选中宏任务队列中第一个宏任务（刚开始就是整体代码） 进入该任务。
 * ②执行立即执行的任务，存好宏任务队列和微任务队列，并执行该次任务所有微任务。
 * ③选中宏任务队列中第一个宏任务.. 循环往复。
 */
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
