// class pagination
function Pagination(){

    this.getPageLink = function(page){

        /* 페이지당 보여줄 숫자 */
        const pageShow = 8;
        
        /* 링크 갯수 */
        const pageLink = Math.ceil(page/pageShow);
        
        return pageLink;
    }

}

/* 페이지 링크 달아주기 */
function getPageLink(page){

}