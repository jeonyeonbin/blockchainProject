var Member = require('../../models/member.model');
var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');

function check(request,res){
    FabricQuery(request).then((resolvedData)=>{
        console.log(resolvedData);
        return res.send('success');
    }).catch((err)=>{
        return res.send('false');
    });
}
exports.validCheckPW = function(req,res){
    var id  = req.session.name;
    var pw = req.body.pw;
    console.log(id + ' ' +pw);
    var request = makeRequest('checkPasswordUser',[id,pw]);
    check(request,res);
       
    // Member.findOne({id:id,pw:pw},function(err,user){
    //     if(err) return res.send("fail");
    //     if(!user) return res.send("fail");
    //     return res.send(user.id);
    // });
}

exports.validCheckID = function(req,res){

    var request = makeRequest('identityOverlapCheck',[req.body.identity]);
    
    check(request,res);
    console.log(req.body.id);
    // Member.findOne({id:req.body.id},function(err,user){
    //     if(err) return res.send("fail");
    //     if(!user) return res.send("fail");
    //     return res.send('success');
    // });
}