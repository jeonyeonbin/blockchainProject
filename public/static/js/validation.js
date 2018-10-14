function ValidationCheck(){


    /* nameCheck */
    this.nameCheck = function(name){
        if(name == null || name ==''){
            alert('이름은 필수 값입니다');
            return false;
        }
        return true;
    }
    
    /* 주민번호체크 */
    this.registNumberCheck = function(first,last){
        var regexp = /^[0-9]*$/;
        if(!regexp.test(first) || !regexp.test(last)){
            alert('주민번호는 숫자만 가능합니다');
            return false;
        }
        if(first == null || first =='' || last ==null || last==''){
            alert('주민번호는 필수 값입니다');
            return false;
        }
        return true;
    }

    /* idCheck */
    this.idCheck = function(id){
        if(id.val() == null || id.val() == ''){
            alert('아이디는 필수 값입니다');
            return false;
        }
        if(!id.hasClass('success')){
            alert('아이디 체크는 필수입니다');
        }
        return true;
    }
        /* passwordCheck */
    this.passwordCheck = function(pw,pwCheck){
        if(pw == null || pw ==''){
            alert('비밀번호는 필수 값입니다');
            return false;
        }
        if(pw != pwCheck ||pwCheck == null || pwCheck ==''){
            alert('비밀번호가 같지 않습니다');
            return false;
        }
        return true;
    }
        
    /* addressCheck */
    this.addrCheck = function(addr) {
        if(addr=='' || addr ==null){
            alert('주소는 필수값입니다');
            return false;
        }
        else return true;
    }

    /* phoneNumber Check */
    this.phoneCheck = function(phoneNumber){
        if(phoneNumber =='' || phoneNumber==null){
            alert('휴대폰 번호는 필수 값입니다.');
            return false;
        }
        else return true;
    }

}

/* 상품 유효성 검사 */
class ItemValidationCheck{

    /* 상품명 유효성 검사 */
    pdNameCheck(name){
        if(name == null || name ==''){
            alert('상품명은 필수 값입니다');
            return false;
        }
        return true;
    }

    /* 상품가격 유효성 검사 */
    pdPriceCheck(price){
        var regexp = /^[0-9]*$/;
        if(!regexp.test(price) ){
            alert('상품 가격은 숫자만 가능합니다');
            return false;
        }
        if(price ==null || price ==''){
            alert('상품 가격은 필수 값입니다');
            return false;
        }
        return true;
    }

    /* 상품명 유효성 검사 */
    pdPictureCheck(picture){
        if(picture == null || picture == undefined || picture ==''){
            alert('상품 사진은 필수 값입니다');
            return false;
        }
        return true;
    }

    /* 상품 거래 방식 유효성 검사 */
    pdTransCheck(rdBtn,inputDD){

        /** 
        * 거래 방식
        * 1 직거래
        * 2 택배거래
        * 3 둘다
        */
        const deliveryAction = $('input[type="radio"][name="transactionMode"]:checked').val();

        /**
         * 배송 방식
         * 1 배송비 포함
         * 2 착불
         */
        const deliveryFee = $('input[type="radio"][name="deliveryFee"]:checked').val();

        if(rdBtn.is('checked') == false ){
            alert('거래 방식을 체크해주세요');
            return false;
        }
        if((deliveryAction == '3' || deliveryAction == '1') && (inputDD =='' || inputDD == null) ){
            alert('직거래 장소를 입력해주세요');
            return false;
        }else if((deliveryAction == '3' || deliveryAction == '2') && (deliveryFee=='1' || deliveryFee=='2')){
            alert('배송 방식을 입력해주세요');
            return false;
        }

        return true;
    }

    /* 상품내용 유효성 검사 */
    pdContentsCheck(contents){
        if(contents == '' || contents ==null){
            alert('상품 내용은 필수 값입니다');
            return false;
        }
        return true;
    }
}