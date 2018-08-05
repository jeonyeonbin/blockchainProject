
$(document).ready(function(){
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

    $('.purchaseChatting').click(()=>{
        var userId = $('#userId').text();
        console.log(userId);
        var url ='http://localhost:5555/chat?id='+userId;
        window.open(url,'_blank','width=650px, height=500px,scrollbar=true,status=no,menubar=no');
    });
}); 