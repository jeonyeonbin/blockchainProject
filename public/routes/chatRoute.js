const path = require('path');
const express = require('express');
const chatController = require('../controller/chat/chatting.controller');
const app = express();
const server = require('http').createServer(app);

require('../controller/chat/chatSocket.controller')(server);

app.use(express.static(path.resolve(path.join(__dirname, '..'))));

app.get('/',chatController.chatGET);              //첫화면
app.get('/chatList',chatController.chatListGET);  //채팅방 리스트 보여주기
app.post('/chatCheck',chatController.chatCheck);  //채팅방 있는지 없는지 여부 체크
app.get('/:room',chatController.chatRoomGET);     //채팅방 보여주기
app.post('/checkId',chatController.chatIdCheck);  //ID 체크

// 채팅 서버 7878 포트 이용
server.listen(7878,function(){
    console.log('Socket IO Server Listen');
});

module.exports = app;