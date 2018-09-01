var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');


//구매 상품 리스트 보기
exports.showBuyProductAllGET = function(req,res){
    var myId = req.session.name;
    //세션 ID로 구매 상품 검색
    var request = makeRequest('queryBuyProductById',[myId]);
    
    FabricQuery(request).then((resolvedData)=>{
        return res.render('member/buyProduct',{items:resolvedData,layout:'../shop/home-page'});
    }).catch((e)=>{
        console.log(e);
        return res.render('member/buyProduct',{layout:'../shop/home-page'});
    });
};

exports.showBuyOneProduct = function(req,res){
    //구매 물품 키값
    var uuid = req.params.key;
    //구매 물품 키값으로 조회
    var request = makeRequest('queryBuyProductOne',uuid);

    FabricQuery(request).then((resolvedData)=>{
        return res.render('member/showProductOne',{items:resolvedData});        
    }).catch((e)=>{
        console.log(e);
    })

};