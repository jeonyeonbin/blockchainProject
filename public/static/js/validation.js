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