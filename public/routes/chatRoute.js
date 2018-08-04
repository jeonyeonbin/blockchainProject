var app = require('express')();
var server =require('http').createServer(app);

var io = require('socket.io')(server);

app.get('/',function(req,res){
    res.render('chat',{layout:false});
});


// chatting socket
io.on('connection',function(socket){
    console.log('a user login');

    //연결 종료
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    //메세지 받음
    socket.on('chat message',function(msg){
        io.emit('chat message',msg);
        console.log('msg :  '+ msg);
    });

});

// 채팅 서버 7878 포트 이용
server.listen(7878,function(){
    console.log('Socket IO Server Listen');
});
module.exports=app;