var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');

//판매 상품 보기
exports.showSellProductAllGET= function(req,res){
    var myId = req.session.name;
    //세션 ID로 판매상품 검색
    //var request = makeRequest('querySellProductById',[myId]);
    
    //FabricQuery(request).then((resolvedData)=>{
        return res.render('member/myProduct');
    //}).catch((e)=>{
       // console.log(e);
    //});
};

exports.showSellOneProduct = function(req,res){
    //판매 물품 키값
    //var uuid = req.params.key;
    //판매 물품 키값으로 조회
    //var request = makeRequest('querySellProductOne',uuid);

    //FabricQuery(request).then((resolvedData)=>{
        return res.render('member/showProductOne');        
    //}).catch((e)=>{
    //   console.log(e);
    //})

}