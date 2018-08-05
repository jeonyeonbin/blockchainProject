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
  
  
  function chatting(){
    return new Promise((resolve,reject)=>{
      $.ajax({
        type : "POST", //전송방식을 지정한다 (POST,GET)
        url : "http://localhost:5555/chat/chatCheck",   // 채팅방 있는지 여부 체크
        data : {id:$('input[type="hidden"]').val()},    // 상대방의 아이디
        dataType:'json',
        error : function(err){
            console.log(err);
            alert('통신실패!!');
        },  
        success : function(data){
            if(data.result =='login') {                   //세션이 없을경우
              alert('로그인을 먼저 하고 진행해주세요');
              window.close();
              return;
            }
            else if(data.result =='errorRoom'){          // 채팅방 생성에 문제가 생겼을시에
              alert('errorRoom');
            }
            else if(data.result =='newRoom'){            // 새로운 채팅방 생성
              // socket.io 서버에 접속한다
              resolve(data);
            }
            else if(data.result =='alreadyRoom'){        // 이미 방이있을경우
              resolve(data);
            }
         }
    
      });
    });
  }


  chatting().then((result)=>{
    //채팅방이 있을때
    if(result.result == 'alreadyRoom'){
      alert('already');
      alert(result.chatRoomNumber.toString());
      window.location.href="/chat/"+result.chatRoomNumber;
      return;
     
    //채팅방이 없을때
    }else if(data.result=='newRoom'){
      alert('new');
      alert(result.chatRoomNumber.toString());
      window.location.href="/chat/"+result.chatRoomNumber;
    }else{
      alert('Error발생');
    }
  }).catch((err)=>{
    console.log(err);
  });
});
