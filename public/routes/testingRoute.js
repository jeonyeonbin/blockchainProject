var express = require('express');
var router = express.Router();
var FabricInvoke = require('../hyperledger-fabric/invoke');
var FabricQuery = require('../hyperledger-fabric/query');


router.post('/regist',function(req,res){
    
    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'createUser',
        // args: ['']
        args: [req.body.identity,req.body.password,req.body.birth,req.body.lastIdNumber,req.body.phone,req.body.email]
    };

    FabricInvoke(request).then(()=>{
        console.log('success');
        res.json('dataSuccess');
    }).catch((err)=>{
        console.log(err);
    });
});

router.get('/count',(req,res)=>{
    var query = 'queryItemCountAll';
    FabricQuery(require('../controller/returnRequest')(query,[])).then(result =>{
        console.log(result);
    });
});

router.get('/range', (req,res)=>{
    var query = 'queryItemRange';
    FabricQuery(require('../controller/returnRequest')(query,['0','8'])).then(result =>{
        console.log(JSON.parse(result));
    });
});
router.post('/login',function(req,res){
    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'validUser',
        // args: ['']
        args: [req.body.identity,req.body.password]
    };
    FabricQuery(request).then((resolvedData)=>{
        res.json(resolvedData);
    }).catch((err)=>{
        console.log(err);
    });
});
router.get('/',function(req,res){
    // var requestArgs = [req.body.data,]
    var itemCategory = 'cloth';
    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'querySellProductByCategory',
        // args: ['']
        args: [itemCategory,'aaaa']
    };

    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);  
        return res.json(resolvedData);
    }).catch(function(err){
        console.log(err);
        return res.json("false");
    });
});

router.post('/passowrd',function(req,res){
    
});
router.post('/',function(req,res){
    //1) seller
    //2) itemName
    //3) itemInfo
    //4) itemPric11e
    //5) itemCategory
    //6) registDateTime
    var registDateTime = Date.now().toString();
    var itemPrice = req.body.itemPrice;
    itemPrice = itemPrice.toString();
    var request = {
		chaincodeId : 'fabcar',
   		fcn : 'createSellProduct',
   		args : [req.body.seller, req.body.itemName,req.body.itemInfo,itemPrice,req.body.itemCategory,req.body.itemPic,req.body.itemContentsPic,registDateTime],
   		chainId : 'mychannel'
	};
    FabricInvoke(request).then(()=>{
        console.log('success');
        res.json('dataSuccess');
    }).catch((err)=>{
        console.log(err);
    });
});


module.exports = router;