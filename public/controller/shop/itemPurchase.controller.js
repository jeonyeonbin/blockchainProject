var FabricInvoke = require('../../hyperledger-fabric/invoke');
var FabricQuery = require('../../hyperledger-fabric/query');

var makeRequest = require('../returnRequest');
exports.purchasePOST= function(req,res){
    
    
    var itemKey = req.body.key;                     // ITEM 고유 키값
    var transactionMode = req.body.transactionMode; // 거래 방식
    var identity = req.session.name;               // 구매자
    
    console.log(itemKey);
    console.log(transactionMode);
    console.log(identity);

    //     (1 : 구매불가, 2: 코인부족, 3: 성공)
    FabricQuery(makeRequest('checkItemState',[itemKey])).then((result)=>{                     //구매 불가 상품인지
        console.log('');
        console.log('first');
        console.log('');
        FabricQuery(makeRequest('checkCoin',[identity,itemKey])).then((result)=>{            //코인이 부족한지
            console.log('');
            console.log('second');
            console.log('');
            FabricInvoke(makeRequest('registTransactionInfo',[itemKey,identity,transactionMode])).then((result)=>{
                return res.send('3');
            }).catch((err)=>{
                return res.send('1');
            })
        }).catch((fail)=>{
            return res.send('2');
        })
    }).catch((fail)=>{
        console.log('hello');
        return res.send('1');
    });
}