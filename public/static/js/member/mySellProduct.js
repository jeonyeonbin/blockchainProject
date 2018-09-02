$(document).ready(function(){
    
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
    function clickDeliveryService(){
      $('.transactionMode').click(function(){
          var transactionInfoKey = $(this).siblings('input[type="hidden"]').val();
          $('#modalTransInfoKey').val(transactionInfoKey.toString());
      });
    }
    clickDeliveryService();
    transactionMode();
    transactionState();
    sendDelivery();
  });