var app = require('express')();
var server =require('http').createServer(app);

var chatController = require('../controller/chat/chatting.controller');


require('../controller/chat/chatSocket.controller')(server);

app.get('/',chatController.chatGET);

// 채팅 서버 7878 포트 이용
server.listen(7878,function(){
    console.log('Socket IO Server Listen');
});
module.exports=app;