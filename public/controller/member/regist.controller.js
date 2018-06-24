var Member = require('../../models/member.model');
var FabricInvoke = require('../../hyperledger-fabric/invoke');
exports.registGET = function(req,res){
    res.render('member/regist',{layout:false});
}
exports.registPOST = function(req,res){
    var member = new Member();
   /*
    회원가입
fcn : registUser
args : [
	// 0, identity
	// 1, password
	// 2, name
	// 3, birth
	// 4, lastIdNumber
	// 5, phone
	// 6, email
	// 7, address
]
   */
    var request ={
        chaincodeId:'fabcar',
        fcn : 'registUser',
        args : [req.body.identity,req.body.password,req.body.name,req.body.birth,req.body.lastIdNumber,req.body.phone,req.body.email,req.body.address],  
    };
    FabricInvoke(request).then((resolvedData)=>{
        return res.send("success");
    }).catch((err)=>{ 
        return res.send("fail");
    });

}