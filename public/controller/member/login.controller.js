var Member = require('../../models/member.model');
var FabricQuery = require('../../hyperledger-fabric/query');
exports.loginGET = function(req,res){
    res.render('member/login',{layout:false});
}

exports.loginPOST = function(req,res){
    var identity = req.body.identity;
    var password = req.body.password;


    console.log(identity);
    console.log(password);


     var request = require('../returnRequest')('loginUser',[identity,password]);
     FabricQuery(request).then((resolvedData)=>{
        req.session.name =identity;
        req.session.pw = password;
        req.session.authorized = true;   
        return res.send("success");
     }).catch((err)=>{
        return res.send('fail');
     });
 

}