$(document).ready(function(){
    function showState(){
        $('input[type="hidden"]').each(function(){
            var $val = $(this).val();
            if($val =='3'){
                $(this).parent().css("opacity","0.5");
                $(this).parent().find('.offer-radius').addClass("offer-danger");
                $(this).parent().find('.shape-text').text('판매완료');
            }            
            if($val == '2'){
                $(this).parent().css("opacity","0.5");
                $(this).parent().find('.offer-radius').addClass("offer-warning");
                $(this).parent().find('.shape-text').text('거래중');
            }
            //팔린상태가 아닐때
            else if($val == '1'){
                $(this).parent().css("opacity","1.0");
                $(this).parent().find('.offer-radius').addClass("offer-primary");
                $(this).parent().find('.shape-text').text('판매중');
            }        
        });
    }
    showState();
});