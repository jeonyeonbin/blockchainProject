var loginController = require('../controller/member/login.controller');
var registController = require('../controller/member/regist.controller');
var logoutController = require('../controller/member/logout.controller');
var clothController = require('../controller/item/cloth.controller');
var shopClothController = require('../controller/shop/cloth.controller');
var checkController = require('../controller/member/check.controller');

module.exports =function(app){
    //login controller
    app.get('/login',loginController.loginGET);
    app.post('/login',loginController.loginPOST);
    //메인 첫페이지
    //옷
    app.get('/test1',function(req,res){
        res.render('test/testParent',{layout:false});
    });
    app.get('/childTest',function(req,res){
        res.render('test/testChild',{layout:false});
    })
    // block chain test 용 페이지 
    
    app.get('/cloth',clothController.clothItemGET);
    app.get('/cloth/:itemName',clothController.clothSelectOneGET);
    //logoutController
    app.get('/logout',logoutController.logoutGET);
    //regist Controller
    app.get('/regist',registController.registGET);
    app.post('/regist',registController.registPOST);
    app.post('/validID',checkController.validCheckID);
    app.post('/sessionCheck',checkController.sessionCheck); // session Check
}
