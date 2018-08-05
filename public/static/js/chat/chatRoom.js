$(document).ready(function(){
    //Enter 눌럿을때 이벤트 처리
      function EnterKeyPress(socket){
        $('#message').keypress((e)=>{
         if(e.keyCode == 13){
            sendMessage(socket);
         }
        });
      }
    
      //채팅 수신
      function receiveMsg(socket){
        socket.on('chat message',function(msg){
        $('#messages').append($('<li>').text(msg));
        });
      }

      //채팅 전송
      function sendMessage(socket){
          var message = $('#message').val();
          socket.emit('chat message',message);
          $('#message').val('');
          return false;
      }
      var socket = io.connect('http://localhost:7878');
      //엔터키 이벤트 
      EnterKeyPress(socket);
      //채팅 수신
      receiveMsg(socket);

});