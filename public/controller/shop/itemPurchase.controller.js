var FabricInvoke = require('../../hyperledger-fabric/invoke');
var makeRequest = require('../returnRequest');
exports.purchasePOST= function(req,res){
    var key = req.body.key;
    var buyer = req.session.name;
    
    FabricInvoke(makeRequest('purchaseItem',[key,buyer])).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });
}