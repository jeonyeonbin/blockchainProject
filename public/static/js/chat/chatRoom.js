$(document).ready(function(){
      //Enter 눌럿을때 이벤트 처리
      function EnterKeyPress(socket,chatRoomNumber){
        $('#message').keypress((e)=>{
         if(e.keyCode == 13){
            sendMessage(socket,chatRoomNumber);
         }
        });
      }
    
      //채팅 수신
      function receiveMsg(socket){
        socket.on('chat message',function(data){
        $('#messages').append($('<li>').text(msg.msg));
        });
      }

      //채팅 전송
      function sendMessage(socket,chatRoomNumber){
          var message = $('#message').val();
          socket.emit('chat message',{msg:message,roomId:chatRoomNumber});
          $('#message').val('');
          return false;
      }
      //채팅방 입장
      function joinRoom(socket,chatRoomNumber){
        socket.emit('joinRoom',{room:chatRoomNumber});
      }
      var socket = io.connect('http://localhost:7878');
      var chatRoomNumber = $('input[type="hidden"]').val();
      joinRoom(socket,chatRoomNumber);//채팅방 입장
      EnterKeyPress(socket,chatRoomNumber);          //채팅 송신
      receiveMsg(socket);             //채팅 수신
});