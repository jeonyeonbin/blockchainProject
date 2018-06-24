var FabricInvoke = require('../../hyperledger-fabric/invoke');
var FabricQuery = require('../../hyperledger-fabric/query');
exports.addCoinGET = function(req,res){
    //코인 양 조회해야댐
    var request ={
        chaincodeId:'fabcar',
        fcn : 'queryUser',
        args : [req.session.name],  
    };
    FabricQuery(request).then((resolvedData)=>{
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData.amountOfCoin);
        res.render('member/addCoin',{coin:resolvedData.amountOfCoin});
    }).catch((err)=>{
        console.log('errPage!!!!!!!!!!!!!!!!!!!!!');
    });
    
}

exports.addCoinPOST =function(req,res){
    var coin = req.body.coin;
    console.log(coin);
    var request ={
        chaincodeId:'fabcar',
        fcn : 'addCoin',
        args : [req.session.name,coin],  
    };
    FabricInvoke(request).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });
}