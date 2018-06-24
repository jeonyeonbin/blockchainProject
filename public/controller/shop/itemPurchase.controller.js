var FabricInvoke = require('../../hyperledger-fabric/invoke');
exports.purchasePOST= function(req,res){
    var key = req.body.key;
    var buyer = req.session.name;
    
    var request ={
        chaincodeId:'fabcar',
        fcn : 'purchaseItem',
        args : [key,buyer],  
    };
    FabricInvoke(request).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });
}