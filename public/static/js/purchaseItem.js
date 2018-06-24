
$(document).ready(function(){
    $('.purchaseItem').click(()=>{
        
        var key = $('#key').val();
        var category = $('.itemCategory').val();
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
                    window.location.href="/shopPage/"+category+key;
                }
            },
            error:function(err){
                alert(error);
            }
        });
    });
}); 