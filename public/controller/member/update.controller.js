var FabricInvoke = require('../../hyperledger-fabric/invoke');
var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
exports.memberUpdateGET = function(req,res){

    FabricQuery(makeRequest('queryUser',[req.session.name])).then((myInfo)=>{
        myInfo = JSON.parse(myInfo);
        console.log(myInfo);
        
        res.render('member/updateUser',{myInfo:myInfo,layout:'../shop/home-page'});
    }).catch((err)=>{
        console.log(err);
    })
};
exports.memberUpdatePOST = function(req,res){
    //찾기 

    // 0, identity
	// 1, password
	// 2, name
	// 3, phone
	// 4, email
	// 5, address
    var request = require('../returnRequest')('updateUser',[req.body.identity,req.body.password,req.body.name,req.body.phone,req.body.email,req.body.address]);

    FabricInvoke(request).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });

};
exports.IDSelectUpdateGET = function(req,res){

    res.render('member/updateUser',{id:req.params.id});
};