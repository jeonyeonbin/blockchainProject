function validID(id){
    $.ajax({
        url:"/validID",
        method:"POST",
        data:{"identity":id},
        success:function(Data){
            if(Data == 'success') alert('사용가능한 아이디입니다');
            else {
                alert('사용불가능한 아이디입니다');
                $('input[name="identity"]').val("");
            }
        },
    });
}

$(document).ready(function(){
    $('.validID').click(function(){
        var id = $('input[name="identity"]').val();
        console.log(id);
        validID(id);
    });
});