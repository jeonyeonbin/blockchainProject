
$(document).ready(function(){
    $('.submitButton').click(()=>{
        var key = $('#key').val();              //아이템 고유키값
        var itemName = $('#itemName').val();   //아이템 이름
        var itemPrice = $('#itemPrice').val(); //아이템 가격
        var itemCategory = $("#itemCategory option:selected").val();
        var itemInfo = $('#itemInfo').text();
        
        alert(key);
        alert(itemName);
        alert(itemPrice);
        alert(itemCategory);
        alert(itemInfo);
        // $.ajax({
        //     url: '/shopPage/purchase/'+key,
        //     method:'POST',
        //     data:{key:key},
        //     success:function(data){
        //         if(data == "success"){
        //             alert('구매가 완료 되었습니다');
        //             window.location.href="/shopPage";
        //         }else{
        //             //모달창 꺼야댐 필수!
        //             alert('코인이 부족합니다.');
        //             window.location.href="/shopPage/"+category+'/'+key;
        //         }
        //     },
        //     error:function(err){
        //         alert(error);
        //     }
        // });
    });
}); 