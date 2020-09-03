var i=0;

function timedCount()
{
i=i+1;
// 这里是用于向 HTML页面传回一段数据
postMessage(i);
setTimeout("timedCount()",500);
}

timedCount();