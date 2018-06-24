
$(document).ready(function(){
    $('.addCoin').click((event)=>{
        event.preventDefault();
        var coin = $('#coin').val();
        $.ajax({
            url: '/myPage/addCoin',
            method:'POST',
            data:{coin:coin},
            success:function(data){
                if(data =="success"){
                    alert('코인충전이 완료되었습니다.');
                    window.location.href="/myPage/addCoin";
                }else{
                    //모달창 꺼야댐 필수!
                    alert('코인충전이 실패되었습니다.');
                    $('.close').trigger('click');
                }
            },
            error:function(err){
                alert(error);
            }
        });
    });
}); 