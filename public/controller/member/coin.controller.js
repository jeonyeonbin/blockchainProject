var FabricInvoke = require('../../hyperledger-fabric/invoke');
var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
exports.addCoinGET = function(req,res){
    //코인 양 조회해야댐
    var request = makeRequest('queryUser',[req.session.name]);
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

    var request = makeRequest('addCoin',[req.session.name,coin]);
    FabricInvoke(request).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });
}