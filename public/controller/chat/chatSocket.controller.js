//socket 관련 함수
function sockFunction(server,req){
    var io = require('socket.io')(server);
    io.on('connection',function(socket){
        console.log('a user login');
        //채팅방 입장
        socket.on('joinRoom',function(data){
            var room = data.room;    //방번호
            socket.join(room);       //채팅방 입장
        });
        disconnect(socket);     //사용자 나간뒤
        receiveMsg(socket,io);     //메세지 수신

    });
}

//소켓 종료
function disconnect(socket){
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
}
//메세지 수신
function receiveMsg(socket,io){

    //메세지 받음
    socket.on('chat message',function(data){
        console.log(data.msg);
        io.sockets.in(data.roomId).emit('chat message',data.msg);
        // io.emit('chat message',msg);
        // console.log('msg :  '+ msg);
    });
    
}
module.exports = sockFunction;