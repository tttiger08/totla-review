/**
 * 事件捕获阶段  ----   处于目标阶段  ----  事件冒泡阶段 (ie 没有事件捕获阶段)
 *  （1）DOM0级：①document.onclick=function(){} //绑定   e
 *               ②document.onlick = null; //移除
 *  （2）DOM2级：①document.addEventListener(function(){},false) ;//绑定
 *               ②document.removeEventListner(function(){},false);//移除
 *  （3）特别的IE事件处理：①dom.attachEvent('onclick',function(){ });//绑定
 *               ②detachEvent('onclick',function(){});//移除
 * DOM2级别的事件  设置为冒泡的时候 从最里层开始触发
 *                设置为补货的话从  最外层开始触发。
 *                阻止向上或乡下传递  用 e.stopPropagation();
 * 
 */
// 3.事件的执行顺序

// （1）无论是哪种绑定方式，对于同一个绑定元素，都是遵循先绑定的先执行原则。  （？？？没确定  ---  已确定  这里说的同一个元素）

// （2）如果是以onclick的方式绑定的，如果对同一个元素重复绑定的话，后面的会覆盖前面的。但是如果是以addEventLisener方式绑定的话，同一个元素绑定多少次，就会执行多少次。

// （3）如果在DOM中直接使用onclick ，则onclick的绑定是早于 addEventListener 的。

// https://juejin.im/post/5db7b2475188252e7c774773