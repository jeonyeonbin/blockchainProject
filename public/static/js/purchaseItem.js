$(document).ready(function(){
    function purchaseItem(){
        $('.purchaseItem').click(()=>{
            //아이템 고유키값
            var key = $('#key').val();
            //카테고리 변수
    
            var category = $('div.mb-3 span#itemCategory').text();
            $.ajax({
                url: '/shopPage/purchase/'+key,
                method:'POST',
                data:{key:key},
                success:function(data){
                    if(data == "success"){
                        alert('구매가 완료 되었습니다');
                        window.location.href="/shopPage";
                    }else{
                        //모달창 꺼야댐 필수!
                        alert('코인이 부족합니다.');
                        window.location.href="/shopPage/"+category+'/'+key;
                    }
                },
                error:function(err){
                    alert(error);
                }
            });
        });
    }
    $('.purchaseChatting').click(()=>{
        var userId = $('#userId').text();
        console.log(userId);
        var url ='http://13.209.211.60:5555/chat?id='+userId;
        window.open(url,'_blank','width=650px, height=500px,scrollbar=true,status=no,menubar=no');
    });

    if($('#sellStateHidden').val()=='1'){                               //판매 상태
        $('.purchaseItem').addClass('btn-primary').text('구매하기');
    }else if($('#sellStateHidden').val()=='2'){                         //거래중 상태
        $('.purchaseItem').addClass('btn-warning').text('거래중');
    }else if($('#sellStateHidden').val()=='3'){                         //판매 완료 상태
        $('.purchaseItem').addClass('btn-danger').text('판매완료');
    }

    if($('#transactionModeHidden').val()=='1'){
        $('.op2').css('display','none');
        $('.transactionModeAppend').after('<p>직거래 (거래장소 : '+$('#transactionPositionHidden').val()+')</p>');
    }else if($('#transactionModeHidden').val()=='2'){
        $('.op1').css('display','none');
        var deliveryFee;
        if($('#deliveryFee').val()=='1') deliveryFee ='O'; 
        else deliveryFee='X';
        $('.transactionModeAppend').after('<p>택배 거래 (착불 여부 : '+deliveryFee+')</p>');       
    }else{
        $('.transactionModeAppend').after('<p>직거래 (거래장소 : '+$('#transactionPositionHidden').val()+')</p>');
        
        var deliveryFee;
        if($('#deliveryFee').val()=='1') deliveryFee ='O'; 
        else deliveryFee='X';
        $('.transactionModeAppend').after('<p>택배 거래 (착불 여부 : '+deliveryFee+')</p>');  
    }
    
    
}); 