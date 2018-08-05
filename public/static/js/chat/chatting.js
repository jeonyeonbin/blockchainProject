$(document).ready(function(){
	
  $('#Progress_Loading').hide(); //첫 시작시 로딩바를 숨겨준다.
})
.ajaxStart(function(){
 $('#Progress_Loading').show(); //ajax실행시 로딩바를 보여준다.
})
.ajaxStop(function(){
 $('#Progress_Loading').hide(); //ajax종료시 로딩바를 숨겨준다.
});

$(document).ready(function(){
  
  //채팅 전송
  function sendMessage(){
    var message = $('#message').val();
    socket.emit('chat message',message);
    $('#message').val('');
    return false;
  }
  
  $.ajax({
    type : "POST", //전송방식을 지정한다 (POST,GET)
    url : "http://localhost:5555/chat/chatCheck",   // 채팅방 있는지 여부 체크
    data : {id:$('input[type="hidden"]').val()},    // 상대방의 아이디
    error : function(err){
        console.log(err);
        alert('통신실패!!');
    },  
    success : function(result){
        if(result =='login') {                   //세션이 없을경우
          alert('로그인을 먼저 하고 진행해주세요');
          window.close();
          return;
        }
        else if(result =='errorRoom'){          // 채팅방 생성에 문제가 생겼을시에
          alert('errorRoom');
        }
        else if(result =='newRoom'){            // 새로운 채팅방 생성
          // socket.io 서버에 접속한다
          alert('newRoom');
        }
        else if(result =='alreadyRoom'){        // 이미 방이있을경우
          alert('alreadyRoom');
        }
    }

       
  });
    
    
 });