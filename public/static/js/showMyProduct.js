$(document).ready(function(){
    function showState(){
        $('input[type="hidden"]').each(function(){
            var $val = $(this).val();
            //팔렷을때 
            alert($val);
            if($val == 'sold'){
                $(this).parent().css("opacity","0.5");
                $(this).parent().find('.offer-radius').addClass("offer-danger");
                $(this).parent().find('.shape-text').text('SOLD');
            }
            //팔린상태가 아닐때
            else {
                $(this).parent().css("opacity","1.0");
                $(this).parent().find('.offer-radius').addClass("offer-primary");
                $(this).parent().find('.shape-text').text('SELLING');
            }        
        });
    }
    showState();
});