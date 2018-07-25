var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');

//판매 상품 보기
exports.showSellProductAllGET= function(req,res){
    var myId = req.session.name;
    //세션 ID로 판매상품 검색
    var request = makeRequest('queryItemBySeller',[myId]);
    
    FabricQuery(request).then((resolvedData)=>{
        console.log('판매 상품 보기!!!!!!');
                
        console.log(resolvedData);
        resolvedData = JSON.parse(resolvedData);
        res.render('member/myProduct',{items:resolvedData});
    }).catch((e)=>{
       console.log(e);
    });
};

exports.showSellOneProduct = function(req,res){
    //판매 물품 키값
    var uuid = req.params.key;
    //판매 물품 키값으로 조회
    var request = makeRequest('queryOneItem',uuid);

    FabricQuery(request).then((resolvedData)=>{
        console.log(resolvedData);
        return res.render('member/showProductOne');        
    }).catch((e)=>{
      console.log(e);
    })

}