//socket 관련 함수
function sockFunction(server){
    var io = require('socket.io')(server);
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
}

module.exports = sockFunction;