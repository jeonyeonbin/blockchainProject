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
          appendId(data.userId,data.msg);
          //스크롤 맨아래로
          $("html, body").animate({ scrollTop: $(document).height() }, 0);
          
          // $('#messages').append($('<li>').text(data.userId+' : '+data.msg ));
        });
      }

      //채팅 전송
      function sendMessage(socket,chatRoomNumber){
          var message = $('#message').val();
          var myId = $('#myId').val();
          socket.emit('chat message',{msg:message,roomId:chatRoomNumber,userId:myId});
          $('#message').val('');
          return false;
      }
      //채팅 아이디에따라 위치정하기
      function getPositionById(){
        var myId = $('#myId').val();
        $('input[type="hidden"]#userId').each(function(){
          var $val = $(this).val();
          //자신 아이디일때
          if($val == myId){
              $(this).parent().parent().addClass('yellowColorChange');
              $(this).parent().parent().prev().css("display","none");
          }
          //자신 아이디가 아닐때
          else {
            $(this).parent().parent().addClass('grayColorChange');
          }        
        });
        //스크롤 맨아래로 
        
      }

      //채팅을 받았을 때,
      function appendId(userId,msg){
        var myId = $('#myId').val();
        var Img = '<img src="../../static/img/kakaoimg.jpg" id="profileImg" alt="" style>'
        var appendMsg = ' <div class="talk-bubble tri-right round left-top grayColorChange">'
        +'<div class="talktext">'
        + '<p>'+msg+'</p>'
        +'</div>'
        +'</div><br>';
        var appendMyMsg = ' <div class="talk-bubble tri-right round left-top yellowColorChange">'
        +'<div class="talktext">'
        + '<p>'+msg+'</p>'
        +'</div>'
        +'</div><br>';
        if(myId != userId){
          $('#messages').append(Img).append(appendMsg);
        }else{
          $('#messages').append(appendMyMsg);
        }
        //스크롤 맨아래로
      }
      //채팅방 입장
      function joinRoom(socket,chatRoomNumber){
        socket.emit('joinRoom',{room:+chatRoomNumber});
      }
      var socket = io.connect('http://localhost:7878');
      var chatRoomNumber = $('input[type="hidden"]#chatRoomNumber').val();
      getPositionById();                             //채팅방 대화내용 불러오기
      document.body.scrollTop = document.body.scrollHeight; // 스크롤 맨아래로
      joinRoom(socket,chatRoomNumber);               //채팅방 입장
      EnterKeyPress(socket,chatRoomNumber);          //채팅 송신
      receiveMsg(socket);                            //채팅 수신
});
$(window).load(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
});