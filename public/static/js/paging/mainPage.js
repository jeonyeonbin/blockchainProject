$(document).ready(function(){


    var pagination = new Pagination();
    const pageLink = $('#pagingCnt').val();
    const makePageLinkCount = pagination.getPageLink(pageLink); //페이지링크수 가져오기


    /* 링크 데이터 양만큼 달아주기 */
    makeLiForLink(makePageLinkCount);

    
    /* page링크 눌럿을때 */
    $('.page-link').click(function(e){
        

        var category = categoryData();
        /* 링크에 파란색깔 지우기 */
        $('.page-item').removeClass("active");
        
        /* 현재 링크 파란색 */
        $(this).parent().addClass('active');

        /* page처리 조건 */
        var sendData = {
            itemCategory:category,
            start : parseInt($(this).attr('value'))*8 -8  ,
            end : parseInt($(this).attr('value'))*8,    
        };

        /* 뿌려준 데이터 보여주기 */
        getDataAndShow(sendData);
    });


    $('.page-link').first().trigger('click');
});

/* 링크 데이터 양만큼 달아주기 */
function makeLiForLink(makePageLinkCount){
    return new Promise( (resolve,reject)=>{
        
        for(var i = 0; i<makePageLinkCount; i+=1){
            let appendData = '<li class="page-item"><div class="page-link" value="'+(i+1)+'">'+(i+1)+'</div></li>'
            $('ul.pagination').append(appendData);
        }
    })
}

/* Data 뿌려주기 */
function getDataAndShow(sendData){
    $.ajax({
            url:'/shopPage/api/changeList',
            data:sendData,
            method:'POST'
         }).done(result =>{
            $('.row.wow.fadeIn').children().remove();

            /* 내용 다바까주기 */
            result.forEach( ele =>{
                CategorySelect(ele);
            });

    });
}

/* 카테고리 값 불러오기 */
function categoryData(){
    let category ='';
    category = $('.mainList.active').children('a').attr('value');
    
    return category;
}