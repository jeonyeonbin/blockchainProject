$(document).ready(function(){
    $('.login100-form-btn').click(()=>{
        var key ="1234";
        var id = $('.inputID').val();
        var pwd = $('.inputPW').val();
        var encrypted = SHA256(pwd);
        $.ajax({
            url:'/login',
            method:'POST',
            data:{identity: id, password:encrypted},
            success:function(data){
                if(data =="success"){
                    alert('로그인을 성공적으로 하였습니다');
                    window.location.href="/shopPage";
                }
                else {
                    alert('아이디나 비밀번호 확인해주세요!');
                    window.location.href="/login";
                }
            },
        });
    });
});