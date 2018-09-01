var Item = require('../../models/item.model');
var FabricInvoke = require('../../hyperledger-fabric/invoke');
var makeRequest = require('../returnRequest');
var fileUpload = require('../uploadFile.controller');
exports.itemRegistGET = function(req,res){

    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    res.render('item/itemregist',{layout:'../shop/home-page'});
}

exports.itemReigstPOST = function(req,res,next){
    console.log('---------------------------------------------');
    console.log('transactionMode'+ req.body.transactionMode);
    console.log('transactionPosition '+ req.body.transactionPosition);
    console.log('deliveryFee' + req.body.deliveryFee);
    console.log('---------------------------------------------');
    
    // console.log(req.files);
    /*
    [Multer 초기화]
    웹   서버에서 파일 업로드 버퍼를 처리하되 물리적으로 파일을 저장하지 않기 위해 메모리 스토리지 타입의 객체를 생성합니다.
    웹 서버에 물리적으로 저장하는 것보다 아마존 S3 등을 이용하는 것이 좋은 이유는,
    로드 밸런서 등을 활용하여 여러 웹 서버가 같은 Node.js 웹 서비스를 제공할 때 특정 서버만 파일을 보유하게 되는 현상 등이 생기는 것을 미연에 방지할 수 있기 때문입니다.
    필요할 경우 메모리 스토리지 대신 다른 스토리지를 써도 됩니다.
    */ 
    //등록하는사람의 아이디 + 현재시간 
    var PicURL;
    if(req.body.transactionMode == '1'){
        req.body.deliveryFee = '0';
    }
    console.log(req.body.deliveryFee);
    fileUpload(req).then(function(url){
        PicURL = url;
        console.log("Promise : "+PicURL);
        return PicURL;   
    }).then((PicURL)=>{
        var request = makeRequest('registItem',[req.session.name,req.body.itemName,req.body.itemInfo,req.body.itemPrice,req.body.itemCategory,PicURL,PicURL,req.body.transactionMode,req.body.transactionPosition,req.body.deliveryFee]);
     console.log("Pic URL :"+PicURL);
     return request;
    }).then((request)=>{
        FabricInvoke(request).then((resolvedData)=>{
            return res.redirect(303,'/myPage');
        }).catch((err)=>{
                console.log(err);
        });
    }).catch((err)=>{
        console.log("file Error : "+err);
    });
}