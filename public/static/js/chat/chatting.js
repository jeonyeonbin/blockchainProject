$(document).ready(function(){
    // socket.io 서버에 접속한다
    var socket = io.connect('http://localhost:7878/');
    
    //엔터키 이벤트 
    $('#message').keypress((e)=>{
      if(e.keyCode == 13){
        sendMessage();
      }
    });

    //채팅 전송
    function sendMessage(){
      var message = $('#message').val();
      socket.emit('chat message',message);
      $('#message').val('');
      return false;
    }
    
    //채팅 수신
    socket.on('chat message',function(msg){
      $('#messages').append($('<li>').text(msg));
    });
 });