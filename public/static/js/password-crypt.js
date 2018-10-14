
$(document).ready(function(){
    $('.regist').click( function(event){

        var vdCheck = new ValidationCheck();
        var name = $('#name').val();
        var identity = $("#identity").val();
        var birth = $('#birth').val();
        var lastIdNumber = $('#lastIdNumber').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var phone = $('#phone').val();
        var address = $('#address').val();


        if(vdCheck.addrCheck(address) && vdCheck.idCheck($("#identity")) && vdCheck.nameCheck(name) && vdCheck.passwordCheck(password,$('#inputPasswordCheck').val())
            && vdCheck.phoneCheck(phone) && vdCheck.registNumberCheck(birth,lastIdNumber)){
                
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
                
            }
        });
        
}); 