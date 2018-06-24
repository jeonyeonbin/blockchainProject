var express = require('express');
var router = express.Router();
var multer = require('multer'); //image load

var mainController = require('../controller/main.controller');
var itemRegistController = require('../controller/item/itemRegist.controller');
var memberUpdateController = require('../controller/member/update.controller');
var checkController = require('../controller/member/check.controller');
var coinController = require('../controller/member/coin.controller');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname +'-'+Date.now())
    },
});
var upload =multer({storage:storage});

router.use(function(req,res,next){
    if(req.session.authorized != true) res.redirect(303,'/login');
    else res.locals.authorized = true;
    next();
});
router.get('/',mainController.mainGET);
//itemRegistration 
router.get('/update',memberUpdateController.memberUpdateGET);
router.get('/update/:id',memberUpdateController.IDSelectUpdateGET);
router.get('/item/regist',itemRegistController.itemRegistGET);
router.post('/item/regist',upload.single('image'),itemRegistController.itemReigstPOST);
router.post('/validPW',checkController.validCheckPW);
router.get('/addCoin',coinController.addCoinGET);
router.post('/addCoin',coinController.addCoinPOST);

module.exports = router;