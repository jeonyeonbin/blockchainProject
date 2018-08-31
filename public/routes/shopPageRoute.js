var express = require('express');
var router = express.Router();
var shopClothController = require('../controller/shop/cloth.controller');
var itemPurchaseController = require('../controller/shop/itemPurchase.controller');
var apiController = require('../controller/shop/api.controller');
router.get('/',require('../controller/item/all.controller').allGET);
router.get('/:itemCategory/:key',shopClothController.clothSelectOneGET);
router.get('/:itemCategory',require('../controller/shop/category.controller').categoryAllGET);
router.post('/purchase/:key',itemPurchaseController.purchasePOST);
router.post('/api/changeList',apiController.changeListInMain);

module.exports = router;