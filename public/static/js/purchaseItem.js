$(document).ready(function(){
    // 현재 지금 아이디 되어있는지
    function checkUser(){

        var returnData;
        $.ajax({
            url:'/sessionCheck',
            method:'POST',
            async:false,
            success:function(data){
                console.log(data);
                if(data == 'success') {
                    console.log('success');
                    returnData = true;
                }
                else {
                    console.log('fail');
                    returnData = false;
                }
            },  
            error:function(data){
                console.log(data);
            }
        });
        return returnData;
    }

    // 구매버튼 클릭
    function purchasingButtonClick(){
        $('.purchasing').click(function(){
            if(checkUser()== false){
                $('.modal').remove('#modalConfirmDelete');
                alert('로그인 먼저해주세요');
                window.location.href ="/login";
                return;
            }
        });
    }

    // 실제 구매
    function purchaseItem(){

        $('.purchaseItem').click(()=>{
            var sendData={
                key :$('#key').val(),                                                         //아이템 고유 키값
                transactionMode : $('input[name="transactionMode"]:checked').val(),           // 1 : 직거래 , 2: 택배 거래 
                seller : $('#userId').text(),                                                 // 판매자
            };
            var category = $('div.mb-3 span#itemCategory').text();                            // 카테고리
            $.ajax({
                url: '/shopPage/purchase/'+key,
                method:'POST',
                data:sendData,
                success:function(data){
                    if(data == '1'){
                        alert('현재 구매가 불가한 상품입니다 다시한번 확인해주세요');
                        window.location.href ='/shopPage/'+category+'/'+sendData.key;
                        return;
                    }else if(data == '2'){  //코인 부족
                        alert('코인이 부족합니다. 충전해주세요.');
                        window.location.href='/myPage/addCoin';
                        return;
                    }else{
                        alert('거래 신청이 완료되었습니다.');
                        window.location.href='/shopPage/'+category+'/'+sendData.key;
                        return;
                    }
                },
                error:function(err){
                    alert(error);
                }
            });
        });
    }


    purchasingButtonClick();
    purchaseItem();
    $('.purchaseChatting').click(()=>{
        var userId = $('#userId').text();
        console.log(userId);
        var url ='http://localhost:5555/chat?id='+userId;
        window.open(url,'_blank','width=650px, height=500px,scrollbar=true,status=no,menubar=no');
    });

    if($('#sellStateHidden').val()=='1'){                               //판매 상태
        $('.purchasing').addClass('btn-primary').text('구매하기');
    }else if($('#sellStateHidden').val()=='2'){                         //거래중 상태
        $('.purchasing').addClass('btn-success').text('거래중');
        $('.purchasing').attr('disabled',true);
        $('.purchasing').css('opacity','0.5');
    }else if($('#sellStateHidden').val()=='3'){                         //판매 완료 상태
        $('.purchasing').addClass('btn-danger').text('판매완료');
        $('.purchasing').attr('disabled',true);
        $('.purchasing').css('opacity','0.5');
    }

    if($('#transactionModeHidden').val()=='1'){
        $('.op2').css('display','none');
        $('.transactionModeAppend').after('<p>직거래 (거래장소 : '+$('#transactionPositionHidden').val()+')</p>');
    }else if($('#transactionModeHidden').val()=='2'){
        $('.op1').css('display','none');
        var deliveryFee;
        if($('#deliveryFeeHidden').val()=='2') deliveryFee ='O'; 
        else deliveryFee='X';
        $('.transactionModeAppend').after('<p>택배 거래 (착불 여부 : '+deliveryFee+')</p>');       
    }else{
        $('.transactionModeAppend').after('<p>직거래 (거래장소 : '+$('#transactionPositionHidden').val()+')</p>');
        
        var deliveryFee;
        if($('#deliveryFeeHidden').val()=='2') deliveryFee ='O'; 
        else deliveryFee='X';
        $('.transactionModeAppend').after('<p>택배 거래 (착불 여부 : '+deliveryFee+')</p>');  
    }
    
    
}); 