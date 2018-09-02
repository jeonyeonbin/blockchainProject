var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');


//구매 상품 리스트 보기
exports.showBuyProductAllGET = function(req,res){
    var myId = req.session.name;


    console.log('my ID : '+myId);
    //세션 ID로 구매 상품 검색
    var request = makeRequest('queryTransactionInfoByBuyer',[myId]);
    var transInfoResult;                // 트랜잭션 정보들
    var itemKeyList = [];               // 아이템 키값 정보들
    var ItemResult;                     // 아이템 정보들
    FabricQuery(request).then((resolvedData)=>{
        transInfoResult = JSON.parse(resolvedData);
        
        //ITEM Key 정보들 수집
        transInfoResult.forEach(function(ele){
            itemKeyList.push(ele.itemKey);
        });

        FabricQuery(makeRequest('queryItemByList',itemKeyList)).then((result)=>{
            ItemResult = JSON.parse(result);
            
            ItemResult.forEach(function(item){
                transInfoResult.some(function(trans){
                    if(item.key == trans.itemKey){
                        console.log('itemKey : ' +item.key);
                        console.log('transKey : ' + trans.itemKey);
                        item.transInfo = trans;
                        return true;
                    }
                });
            })

            console.log(ItemResult);
        }).catch((err)=>{
            console.error(err);
        })
    }).catch((e)=>{
        console.log(e);
        // return res.render('member/buyProduct',{layout:'../shop/home-page'});
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