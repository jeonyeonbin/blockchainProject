function validPW(password){

    $.ajax({
        url:"/myPage/validPW",
        method:"POST",
        data:{"pw":password},
        success:function(Data){
            if(Data == 'fail') alert('비밀번호가 다릅니다 확인해주세요');
            else {
                window.location.href="/myPage/update/"+Data;
            }
        },
    });
}

$(document).ready(function(){

    $('a.btn.btn-primary').click(function(){
        var encrypted = SHA256($('#password').val());
        validPW(encrypted);
    });
});