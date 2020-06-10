var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    path: '/ws'
});


var IndexRouter = require('./router/Index')
app.use(IndexRouter)
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
//rules数据定时同步
let sync = false;

if (sync) {

}

/**
 * 同步
 * 
 */
async function syncServer() {
    setInterval(() => {
        // console.log('同步代码')

    }, 5000);
}
syncServer();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', `${req.headers.origin || '*'}`);
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


app.all('/', (req, res) => {
    res.send({
        body: req.body,
        subdomains: req.subdomains,
        query: req.query,
        fresh: req.fresh,
        header: req.headers
    })
});

app.all('/home', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

app.all('/test/pages', (req, res) => {
    res.json({
        code: 200,
        data: {
            info: {
                a: 1
            }
        }
    })
})


var sockets = {};
var views = {};

var idcount = 0;

io.on('connection', (socket) => {

    socket.uid = idcount++;
    sockets[socket.uid] = socket;

    socket.emit('info', {
        uid: socket.uid,
    })


    socket.on('row', (row) => {
        io.emit('row', {
            uid: socket.uid,
            row: row,
        })
    });

    console.log('connection uid : ' + socket.uid);
    socket.on('view', (row) => {

        let {
            viewId, data
        } = row
        views[viewId] = data;
        io.emit('view', {
            viewId,
            data
        })

    });


    //获取初始化的views
    socket.on('view-init', (row) => {
        io.emit('view-init', {
            views
        })
    });


});

http.listen(3000, () => {
    console.log('服务启动: http://127.0.0.1:3000');
});