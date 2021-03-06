
$(document).ready(function(){
    $('.update').click((event)=>{

        var vdCheck = new ValidationCheck();

        var name = $('#name').val();
        var identity = $("#identity").val();
        var birth = $('#birth').val();
        var lastIdNumber = $('#lastIdNumber').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var phone = $('#phone').val();
        var address = $('#address').val();

        var encrypted = SHA256(password);
        console.log('update');
        if(vdCheck.addrCheck(address) && vdCheck.nameCheck(name) && vdCheck.passwordCheck(password,$('#inputPasswordCheck').val())
            && vdCheck.phoneCheck(phone)){

                $.ajax({
                    url: '/myPage/update',
                    method:'POST',
                    data:{name:name,identity:identity,birth:birth,lastIdNumber:lastIdNumber,email:email,password:encrypted,phone:phone,address:address},
                    success:function(data){
                        if(data =="success"){
                            alert('회원 수정이 완료되었습니다. 다시 로그인 해주세요');
                            window.location.href="/logout";
                        }else{
                            alert('회원 수정이 실패되었습니다');
                            window.location.href="/myPage/update";
                        }
                    },
                    error:function(err){
                        alert(error);
                    }
                });

            }
    });
}); 