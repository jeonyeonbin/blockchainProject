$(document).ready(function(){
    $('input[type="hidden"]').each(function(){
        var $val = $(this).val();
        
        console.log($val);
        if($val == 'sold'){
            $(this).parent().css("opacity","0.5");
            $(this).parent().find('.badge').addClass("danger-color");
            $(this).parent().find('.badge').text('SOLD');
        }
        else {
            $(this).parent().css("opacity","1.0");
            $(this).parent().find('.badge').addClass("primary-color");
            $(this).parent().find('.badge').text('NEW');
        }        
    });
});