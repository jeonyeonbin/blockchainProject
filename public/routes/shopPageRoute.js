var express = require('express');
var router = express.Router();
var shopClothController = require('../controller/shop/cloth.controller');
var itemPurchaseController = require('../controller/shop/itemPurchase.controller');
router.get('/',require('../controller/item/all.controller').allGET);
router.get('/:itemCategory/:key',shopClothController.clothSelectOneGET);
router.get('/:itemCategory',shopClothController.clothAllGET);
router.post('/purchase/:key',itemPurchaseController.purchasePOST);
module.exports = router;