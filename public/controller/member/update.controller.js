var FabricInvoke = require('../../hyperledger-fabric/invoke');
var FabricQuery = require('../../hyperledger-fabric/query');

exports.memberUpdateGET = function(req,res){
    res.render('member/update',{id:req.session.name});
};
exports.memberUpdatePOST = function(req,res){
    //찾기 
    var password = req.body.password;
    var identity = req.session.name;

    var request = {
        chainCode:'fabcar',
        fcn:'',
        args: [identity,password],
    };
    FabricQuery(request).then((resolvedData)=>{
        
    }).catch((err)=>{
        
    });

};
exports.IDSelectUpdateGET = function(req,res){

    res.render('member/updateUser',{id:req.params.id});
};