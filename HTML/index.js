// href  引用外部资源，但是不会暂停页面解析（引用css的时候可能会暂停css解析）
// src   指用外部资源替换当前，当浏览器遇到src的时候，会暂停页面解析，知道该资源被下载或执行完毕，所以一般script都放到页面底部。



// meta属性的作用
// 1.charset：定义HTML文档的字符集  
// <meta charset="UTF-8" >


// 2.http-equiv：可用于模拟http请求头，用来设置本页面的过期时间、缓存、刷新
// <meta http-equiv="expires" content="Wed, 20 Jun 2019 22:33:00 GMT">

// 3.viewport：视口，用于控制页面宽高及缩放比例
// <meta 
//     name="viewport" 
//     content="width=device-width, initial-scale=1, maximum-scale=1"
// >

  {/* viewport的参数和作用
width/height，宽高，默认宽度980px
initial-scale，初始缩放比例，1~10
maximum-scale/minimum-scale，允许用户缩放的最大/小比例
user-scalable，用户是否可以缩放 (yes/no)

http-equive属性的作用和参数
expires，指定过期时间
progma，设置no-cache可以禁止缓存
refresh，定时刷新
set-cookie，可以设置cookie
X-UA-Compatible，使用浏览器版本
apple-mobile-web-app-status-bar-style，针对WebApp全屏模式，隐藏状态栏/设置状态栏颜色 */}

