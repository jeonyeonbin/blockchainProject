var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequset = require('../returnRequest');


//구매 상품 리스트 보기
exports.showBuyProductAllGET = function(req,res){
    var myId = req.session.name;
    //세션 ID로 구매 상품 검색
    var request = makeRequest('queryBuyProductById',[myId]);
    
    FabricQuery(request).then((resolvedData)=>{
        return res.render('member/showBuyProduct',{items:resolvedData});
    }).catch((e)=>{
        console.log(e);
    });
};

exports.showBuyOneProduct = function(req,res){
    //구매 물품 키값
    var uuid = req.params.key;
    //구매 물품 키값으로 조회
    var request = makeRequset('queryBuyProductOne',uuid);

    FabricQuery(request).then((resolvedData)=>{
        return res.render('member/showBuyProductOne',{items:resolvedData});        
    }).catch((e)=>{
        console.log(e);
    })

};