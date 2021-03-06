// “1. GET使用URL或Cookie传参，而POST将数据放在BODY中”，这个是因为HTTP协议用法的约定。并非它们的本身区别。

// “2. GET方式提交的数据有长度限制，则POST的数据则可以非常大”，这个是因为它们使用的操作系统和浏览器设置的不同引起的区别。也不是GET和POST本身的区别。

// “3. POST比GET安全，因为数据在地址栏上不可见”，这个说法没毛病，但依然不是GET和POST本身的区别。

// 四、终极区别

// GET和POST最大的区别主要是GET请求是幂等性的，POST请求不是。这个是它们本质区别，上面的只是在使用上的区别。
// 所谓幂等性  HTTP幂等方法，是指无论调用多少次都不会有不同结果的 HTTP 方法。不管你调用一次，还是调用一百次，一千次，结果都是相同的。

// GET     /tickets       # 获取ticket列表
// GET     /tickets/12    # 查看某个具体的ticket
// POST    /tickets       # 新建一个ticket
// PUT     /tickets/12    # 更新ticket 12
// PATCH   /tickets/12    # 更新ticket 12
// DELETE  /tickets/12    # 删除ticekt 12
// HTTP GET方法
// HTTP GET方法，用于获取资源，不管调用多少次接口，结果都不会改变，所以是幂等的。


// GET     /tickets       # 获取ticket列表
// GET     /tickets/12    # 查看某个具体的ticket
// 只是查询数据，不会影响到资源的变化，因此我们认为它幂等。

// 值得注意，幂等性指的是作用于结果而非资源本身。怎么理解呢？例如，这个HTTP GET方法可能会每次得到不同的返回内容，但并不影响资源。

// 可能你会问有这种情况么？当然有咯。例如，我们有一个接口获取当前时间，我们就应该设计成


// GET     /service_time # 获取服务器当前时间
// 它本身不会对资源本身产生影响，因此满足幂等性。

// HTTP POST方法
// HTTP POST方法是一个非幂等方法，因为调用多次，都将产生新的资源。


// POST    /tickets       # 新建一个ticket
// 因为它会对资源本身产生影响，每次调用都会有新的资源产生，因此不满足幂等性。

