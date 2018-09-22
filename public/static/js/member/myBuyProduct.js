
$(document).ready(function(){
    //트랜잭션의 현재 상태에 따라 변화 (1. 거래중 , 2. 배송중 , 3. 거래완료 , 4. 거래 취소)
    function transactionState(){
      $('.transactionState').each(function(data){
        var state = $(this).text();
        if(state=='1'){
          $(this).text('').html('<button type="button" class="btn btn-outline-secondary btn-rounded waves-effect">거래중</button>');
        }else if(state =='2'){
          $(this).text('').html('<button type="button" class="btn btn-outline-default btn-rounded waves-effect">배송중</button>');
          $(this).siblings('.transactionMode').find('button').removeAttr('data-toggle').removeAttr('data-target');
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
          $(this).text('').html('<button type="button" class="btn btn-outline-default btn-rounded waves-effect delivery" data-toggle="modal" data-target="#centralModalSuccessDemo" value="delivery">택배거래</button>');
          

        }
      });
    }

    // 송장번호 입력후 업데이트 하기
    function sendDelivery(){
        $('.sendDelivery').click(function(){
            var number = $('input[name="sendNumber"]').val();
            var company = $('select option:selected').val();
            var transactionInfoKey = $('#modalTransInfoKey').val();
            if(number.length ==13 || number.length==14){
                $.ajax({
                    url:'/myPage/updateDelivery',
                    method:'POST',
                    data:{number: number, company:company,transactionInfoKey:transactionInfoKey},
                    success: function(data){
                        if(data=='true'){
                          this.alert('송장 번호 등록이 성공적으로 수행되었습니다.');
                        }else{
                          this.alert('등록이 성공적으로 이루어지지않았습니다. 다시 한번 입력 해주세요');
                        }
                        $('#modalTransInfoKey').val('');
                        this.window.location.href='/myPage/showMySellProduct';
                    },
                });
            }else{
                this.alert('송장번호는 10~11 자리여야 합니다');
                $('input[name="sendNumber"]').val('');
            }
        });
    }
    
    // 배송버튼 클릭시에 트랜잭션 키값 넘겨주기
    function clickDeliveryService(){
      $('.transactionMode').click(function(){
          var transactionInfoKey = $(this).siblings('.transactionInfoKey').val();
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
        var url ='http://13.209.211.60:5555/chat?id='+userId;
        window.open(url,'_blank','width=650px, height=500px,scrollbar=true,status=no,menubar=no');
      });
    }


    // 버튼 활성화 (1. 택배 , 배송중 일때 2. 직거래, 거래중일때)
    function buttonActive(){
        $('th[scope="row"]').each(function(){
          if(!(($(this).siblings('.transactionMode').text() =='2' &&$(this).siblings('.transactionState').text() =='2') ||
          ($(this).siblings('.transactionMode').text() =='1' &&$(this).siblings('.transactionState').text() =='1'))){
            $(this).siblings('.transactionToServer').find('button').attr('disabled');
            $(this).siblings('.transactionToServer').find('button').css('opacity','0.2');
          } 
        });
      }
  
      // 거래 완료 버튼 클릭
      function transactionComplete(){
          var itemKey = $('')
          $('button.transactionComplete').click(function(){
            var transactionKey = $(this).parent().siblings('.transactionInfoKey').val();
            $.ajax({
              url:'/myPage/buyerChangeTransacationState',
              method:'POST',
              async:false,
              data:{transactionKey:transactionKey,transactionState:'3'},
              success: function(result){
                if(result == 'success'){
                  alert('상품 거래 완료 신청이 되었습니다');
                }else{
                  alert('실패하였습니다 다시 한번 실행부탁드립니다');
                }
              }
  
            }).then(function(){
              $.ajax({
                url:'/myPage/checkApprove',
                method:'POST',
                async:false,
                data:{transactionKey:transactionKey,transactionState:'3'},
                success:function(result){
                  if(result =='success'){
                    alert('상품 거래 완료가 되었습니다');
                  }else{
                    alert('소비자측에서 아직 상품 확인을 누르지 않았습니다.');
                  }
                  window.location.href="/myPage/showMyBuyProduct";
                }
              });
            });
          });
      } 
      
      // 거래 취소 버튼 클릭
      function transactionCancel(){
          $('.transactionCancel').click(function(){
            var transactionKey = $(this).parent().siblings('.transactionInfoKey').val();
            $.ajax({
              url:'/myPage/checkApprove',
              method:'POST',
              data:{transactionKey:transactionKey,transactionState:'4'},
              success: function(result){
                if(result == 'success'){
                  alert('상품 거래 취소 신청이 완료되었습니다');
                }else{
                  alert('실패하였습니다 다시 한번 실행부탁드립니다');
                }
              }
  
            });
          });
      }
    
    buttonActive();
    transactionComplete();
    transactionCancel();
    transactionMode();
    chattingClick();
    // confirmTransaction();
    // clickDeliveryService();
    transactionState();
    // sendDelivery();
  });