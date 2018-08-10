const chatContentsModel = require('../../models/chat/chatContents.model');
const chatRoomModel = require('../../models/chat/chatRoom.model');

//Date함수에서 +문자열로가져오기
Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) +
               pad2(this.getHours()) +
               pad2(this.getMinutes()) +
               pad2(this.getSeconds());
    }
});
//socket 관련 함수


function sockFunction(server) {
    var io = require('socket.io')(server);
    io.on('connection',function(socket){
        console.log('a user login');
        joinRoom(socket);       //채팅방 입장
        disconnect(socket);     //사용자 나간뒤
        receiveMsg(socket,io);  //메세지 수신
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
        console.log(data.roomId);
        console.log(data.userId);
        var chatContentM = new chatContentsModel();
        chatContentM.chatContents = data.msg;
        chatContentM.chatSender = data.userId;
        chatContentM.chatNo = data.roomId;
        chatContentM.chatDate = new Date().YYYYMMDDHHMMSS();
        chatContentM.save((err)=>{
            if(err) return ;
        });
        io.sockets.in(data.roomId).emit('chat message',{sendDate: chatContentM.chatDate,msg:data.msg,userId:data.userId});
        // io.emit('chat message',msg);
        // console.log('msg :  '+ msg);
    });
    
}

function joinRoom(socket){
    socket.on('joinRoom',function(data){
        var room = data.room;    //방번호
        socket.join(room);       //채팅방 입장
    });
}
module.exports = sockFunction;