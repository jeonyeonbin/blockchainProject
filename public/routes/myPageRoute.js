var express = require('express');
var router = express.Router();
var multer = require('multer'); //image load

var mainController = require('../controller/main.controller');
var itemRegistController = require('../controller/item/itemRegist.controller');
var memberUpdateController = require('../controller/member/update.controller');
var checkController = require('../controller/member/check.controller');
var coinController = require('../controller/member/coin.controller');
var sellProductController = require('../controller/member/sell.controller');
var buyProductController = require('../controller/member/buy.controller');
var invoiceController  = require('../controller/member/invoice.controller');
// var upload =multer({storage:storage});

//메모리 상의 버퍼 저장
var multer = require('multer');
var memorystorage = multer.memoryStorage();
var upload = multer({ storage: memorystorage });
router.use(function(req,res,next){
    if(req.session.authorized != true) res.redirect(303,'/login');
    else res.locals.authorized = true;
    next();
});
//관리자 첫페이지
router.get('/',mainController.mainGET);
//멤버 수정 페이지
router.get('/update',memberUpdateController.memberUpdateGET);
//멤버 수정 
router.post('/update',memberUpdateController.memberUpdatePOST);

router.get('/update/:id',memberUpdateController.IDSelectUpdateGET);
//아이템 등록
router.get('/item/regist',itemRegistController.itemRegistGET);
router.post('/item/regist',upload.array('image'),itemRegistController.itemReigstPOST);
//비밀 번호 체크
router.post('/validPW',checkController.validCheckPW);
//코인 추가 기능
router.get('/addCoin',coinController.addCoinGET);
router.post('/addCoin',coinController.addCoinPOST);
//판매 상품 보기
router.get('/showMySellProduct',sellProductController.showSellProductAllGET);
//판매 상품 한개 보기
router.get('/showMySellProduct/:key',sellProductController.showSellOneProduct);
//판매 상품 정보 수정
router.post('/updateProduct',upload.array('image'),sellProductController.updateProduct);
//구매 상품 보기
router.get('/showMyBuyProduct',buyProductController.showBuyProductAllGET);
//구매 상품 한개 보기
router.get('/showMyBuyProduct/:key',buyProductController.showBuyOneProduct);
//택배 상품 송장번호 수정하기
router.post('/updateDelivery',sellProductController.updateDelivery);

//구매 취소 및 구매 완료(판매자)

router.post('/sellerChangeTransactionState',sellProductController.sellerChangeTransacationState);
// 판매완료인지 체크
router.post('/checkApprove',sellProductController.checkApprove);

//구매 취소 및 구매 완료(구매자)
router.post('/buyerChangeTransacationState',buyProductController.buyerChangeTransacationState);

//송장번호 확인
router.get('/checkInvoice',invoiceController.checkInvoice);

//상품 판매 취소
router.post('/itemCancel',sellProductController.ItemCancel);

module.exports = router;