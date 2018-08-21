const path = require('path');
const express = require('express');
const chatController = require('../controller/chat/chatting.controller');
const app = express();
const server = require('http').createServer(app);

require('../controller/chat/chatSocket.controller')(server);

app.use(express.static(path.resolve(path.join(__dirname, '..'))));

app.get('/',chatController.chatGET);
app.get('/chatList',chatController.chatListGET);
app.post('/chatCheck',chatController.chatCheck);
app.get('/:room',chatController.chatRoomGET);

// 채팅 서버 7878 포트 이용
server.listen(7878,function(){
    console.log('Socket IO Server Listen');
});

module.exports = app;