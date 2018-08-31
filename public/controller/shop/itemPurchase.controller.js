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

    FabricQuery(makeRequest('registTransactionInfo',[itemKey,identity,transactionMode])).then((data)=>{
        //(1 : 구매불가, 2: 코인부족, 3: 성공)
        console.log(data);
        return res.send(data);
    }).catch((err)=>{
        console.log(err);
    });  
    // FabricInvoke(makeRequest('purchaseItem',[key,buyer])).then((resolvedData)=>{
    //     return res.send("success");
    // }).catch((err)=>{ 
    //     return res.send("fail");
    // });
}