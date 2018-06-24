
$(document).ready(function(){
    $('.regist').click((event)=>{
        event.preventDefault();
        var name = $('#name').val();
        var identity = $("#identity").val();
        var birth = $('#birth').val();
        var lastIdNumber = $('#lastIdNumber').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var phone = $('#phone').val();
        var address = $('#address').val();

        var encrypted = SHA256(password);

        $.ajax({
            url: '/regist',
            method:'POST',
            data:{name:name,identity:identity,birth:birth,lastIdNumber:lastIdNumber,email:email,password:encrypted,phone:phone,address:address},
            success:function(data){
                if(data =="success"){
                    alert('회원가입이 완료 되었습니다.');
                    window.location.href="/login";
                }else{
                    alert('회원가입에 실패되었습니다.');
                }
            },
            error:function(err){
                alert(error);
            }
        });
    });
}); 