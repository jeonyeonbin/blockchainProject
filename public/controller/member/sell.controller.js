var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
var fileUpload = require('../uploadFile.controller');
var FabricInvoke = require('../../hyperledger-fabric/invoke');

//판매 상품 보기
exports.showSellProductAllGET= function(req,res){
    var myId = req.session.name;
    //세션 ID로 판매상품 검색
    var request = makeRequest('queryItemBySeller',[myId]);
    var transactionInfo;            // transactionInfo
    var items;
    FabricQuery(request).then((resolvedData)=>{
        items = JSON.parse(resolvedData);
        FabricQuery(makeRequest('queryTransactionInfoBySeller',[myId])).then((result)=>{
            transactionInfo = JSON.parse(result);                   //결과값 삽입
            
            //item 정보에 transInfo 넣어주기
            items.forEach(function(item,idx){
                    item.transInfo = transactionInfo[idx];
            });
             
            console.log(items);
            return res.render('member/myProduct',{items:items,layout:'../shop/home-page'});
        }).catch((err)=>{
            return res.render('500',{error:err});
        })
    }).catch((e)=>{
       console.log(e);
    });
};

exports.showSellOneProduct = function(req,res){
    //판매 물품 키값
    var uuid = req.params.key;
    //판매 물품 키값으로 조회
    var request = makeRequest('queryItem',[uuid]);

    FabricQuery(request).then((resolvedData)=>{
        
        //hbs에는 JSON 형태로 보내줘야댐
        resolvedData = JSON.parse(resolvedData);
        return res.render('member/showProductOne',{item:resolvedData});        
    }).catch((e)=>{
      console.log(e);
    })

}
exports.updateProduct = function(req,res){
     //등록하는사람의 아이디 + 현재시간 
     var PicURL;
     fileUpload(req).then(function(url){
         PicURL = url;
         return PicURL;   
     }).then((PicURL)=>{
        console.log(req.body.key);
        console.log(req.body.itemName);
        console.log(req.body.itemInfo);
        console.log(req.body.itemPrice);
        console.log(req.body.itemCategory);
        var request = makeRequest('updateItem',[req.body.key,req.body.itemName,req.body.itemInfo,req.body.itemPrice,req.body.itemCategory,PicURL,PicURL]);
             //url 정보 저장
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

exports.updateDelivery = function(req,res){

    var transactionInfoKey = req.body.transactionInfoKey; //트랜잭션 번호
    var deliveryCompany = req.body.company;               //송장 회사
    var deliveryInvoice = req.body.number;                //송장 번호
    var transactionState ='2';                            //배송중으로 알림
    console.log(transactionInfoKey);
    console.log(deliveryCompany);
    console.log(deliveryInvoice);
    
    var request = makeRequest('updateTransactionInfoForDelivery',[transactionInfoKey,deliveryCompany,deliveryInvoice]);

    FabricInvoke(request).then((result)=>{
        console.log(result);
        return res.send('true');
    }).catch((err)=>{
        console.log(err);
        return res.send('false');
    })

}