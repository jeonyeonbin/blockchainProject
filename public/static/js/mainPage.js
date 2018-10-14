$(document).ready(function(){
    

    showState();
    $('.nav-item.mainList').click(function(){

        //active한것 먼저 삭제
        $('ul.navbar-nav.categorySelectMain').each(function(){
           $(this).find('li').removeClass('active');
        });

        //클릭한것 active
        $(this).addClass('active');

        //ajax를 통해 데이터 바꿔야댐
       var category = $(this).children('a').attr('value');
       
       $.ajax({
           url:'/shopPage/api/changeList',
           data:{itemCategory:category},
           method:'POST', 
           success:function(data){
               $('.row.wow.fadeIn').children().remove();
               data.forEach(function(element){
                   CategorySelect(element);
               });
           }
       })
        
    });
});

function showState(){
    $('input[type="hidden"]').each(function(){
        var $val = $(this).val();
        //팔렷을때 
        if($val == '3'){
            $(this).parent().css("opacity","0.5");
            $(this).parent().find('.badge').addClass("danger-color");
            $(this).parent().find('.badge').text('판매 완료');
        }
        //팔린상태가 아닐때
        else if($val=='1'){
            $(this).parent().css("opacity","1.0");
            $(this).parent().find('.badge').addClass("primary-color");
            $(this).parent().find('.badge').text('구매 가능');
        }else if($val =='2'){
            $(this).parent().css("opacity","0.5");
            $(this).parent().find('.badge').addClass("success-color");
            $(this).parent().find('.badge').text('거래중');
            
        }
    });
}

function CategorySelect(item){
    var text ='<div class="col-lg-3 col-md-6 mb-4"><!--Card--><div class="card" id="card">'
    +'<input type="hidden" name="" value='+item.sellState+'>'
    +'<!--Card image-->'
    +  '<div class="view overlay">'            
    +'<img src="'+item.itemPic+'" class="card-img-top" alt="" style="height:255px; width:255px;">'
    +    '<a href="/shopPage/'+item.itemCategory+'/'+item.key+'">'
    + '     <div class="mask rgba-white-slight"></div>'
    + '   </a>'
    + ' </div>'
    + ' <!--Card image-->'

    +' <!--Card content-->'
    +'  <div class="card-body text-center">'
    +'    <!--Category & Title-->'
    +'    <a href="/shopPage/'+item.itemCategory+'/'+item.key+'" class="grey-text">'
    +'      <h5>'+item.itemCategory+'</h5>'
    +'  </a><h5><strong><a href="/shoPage/'+item.itemCategory+'/'+item.key+'" class="dark-grey-text">'+item.itemName+'<span class="badge badge-pill"></span></a>'
    +'      </strong></h5>'
    +'  <h4 class="font-weight-bold blue-text"><strong>'+item.itemPrice+'원</strong></h4></div></div><!--Card--></div>';

    $('.row.wow.fadeIn').append(text);
    showState();
}