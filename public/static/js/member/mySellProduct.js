'use strict';

$(document).ready(function(){
    //트랜잭션의 현재 상태에 따라 변화 (1. 거래중 , 2. 배송중 , 3. 거래완료 , 4. 거래 취소)
    function transactionState(){
      $('.transactionState').each(function(data){
        var state = $(this).text();
        if(state=='1'){
          $(this).text('').html('<button type="button" class="btn btn-outline-secondary btn-rounded waves-effect">거래중</button>');
        }else if(state =='2'){
          $(this).text('').html('<button type="button" class="btn btn-outline-default btn-rounded waves-effect">배송중</button>');
        }else if(state =='3'){
          $(this).text('').html('<button type="button" class="btn btn-outline-primary btn-rounded waves-effect">거래완료</button>');
        }else if(state =='4'){
          $(this).text('').html('<button type="button" class="btn btn-outline-danger btn-rounded waves-effect">거래취소</button>');
        }
      });
    }
    
    //트랜잭션 모드에 따라 버튼 구별 (1 . 직거래 , 2. 택배 거래)
    function transactionMode(){
      $('.transactionMode').each(function(data){
       var state = $(this).text();
        if(state=='1'){
          $(this).text('').html('<button type="button" class="btn btn-outline-secondary btn-rounded waves-effect">직거래</button>');
        }else if(state =='2'){
          $(this).text('').html('<button type="button" class="btn btn-outline-default btn-rounded waves-effect delivery" id="modal" data-toggle="modal" data-target="#centralModalSuccessDemo" value="delivery">택배거래</button>');
          

        }
      });
    }

    // 송장번호 입력후 업데이트 하기
    function sendDelivery(){
        $('.sendDelivery').click(function(){
            var number = $('input[name="sendNumber"]').val();
            var company = $('select option:selected').val();
            var transactionInfoKey = $('#modalTransInfoKey').val();
            alert(transactionInfoKey);
            if(number.length ==13 || number.length==14){
                $.ajax({
                    url:'/myPage/updateDelivery',
                    method:'POST',
                    data:{number: number, company:company,transactionInfoKey:transactionInfoKey},
                    success: function(data){
                        if(data=='true'){
                          alert('송장 번호 등록이 성공적으로 수행되었습니다.');
                        }else{
                          alert('등록이 성공적으로 이루어지지않았습니다. 다시 한번 입력 해주세요');
                        }
                        $('#modalTransInfoKey').val('');
                        window.location.href='/myPage/showMySellProduct';
                    },
                });
            }else{
                alert('송장번호는 10~11 자리여야 합니다');
                $('input[name="sendNumber"]').val('');
            }
        });
    }
    
    // 배송버튼 클릭시에 트랜잭션 키값 넘겨주기
    function clickDeliveryService(){
      $('.transactionMode').click(function(){
          var transactionInfoKey = $(this).siblings('input[type="hidden"]').val();
          $('#modalTransInfoKey').val(transactionInfoKey.toString());
      });
    }

    // 구매 신청 여부 있는지 판별
    function confirmTransaction(){
      $('.confirmTransaction').each(function(){
        if($(this).val() == 'false'){
          $(this).parent().find('.buyer').text('구매신청자 없음').css('cursor','default').removeClass('chatting');
          $(this).parent().find('.transactionMode').text('구매신청자 없음');
          $(this).parent().find('.startDateTime').text('구매신청자 없음');
          $(this).parent().find('.transactionState').html('<button type="button" class="btn btn-outline-warning waves-effect">구매 신청자 없음</button>')
        }
      })
    }

    // 채팅 시작
    function chattingClick(){
      $('.buyer').click(function(){
        var userId = $(this).children('h4').text();
        var url ='http://localhost:5555/chat?id='+userId;
        window.open(url,'_blank','width=650px, height=500px,scrollbar=true,status=no,menubar=no');
      });
    }

    chattingClick();
    confirmTransaction();
    clickDeliveryService();
    transactionMode();
    transactionState();
    sendDelivery();
  });