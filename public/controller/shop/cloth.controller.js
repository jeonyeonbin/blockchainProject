


var ItemModel = require('../../models/item.model');

var FabricQuery = require('../../hyperledger-fabric/query');
var FabricInvoke = require('../../hyperledger-fabric/invoke');
exports.test = function(req,res){
    // var requestArgs = [req.body.data,]
    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'querySellProductByList',
        // args: ['']
        args: ['sumin974#20180605/1505','sumin974#20180605/1506']
    };

    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);
        return res.render('shop/test',{data : resolvedData,layout:'../shop/home-page'});
    }).catch(function(err){
        console.log(err);
    });
}
exports.insertTest = function(req,res){
    var request = {
        chaincodeId : 'fabcar',
   		fcn : 'createSellProduct',
   		args : [ 'sumin4', '청바지', '20000', '20180605/1507' ],
   		chainId : 'mychannel',
    };
    FabricInvoke(request).then(function(resolvedData){
        console.log(resolvedData);
    }).then(function(){
        res.json('success');
    }).catch((err)=>{
        console.log(err);
    })


}

exports.clothSelectOneGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    console.log("진입");
    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'queryItem',
        // args: ['']
        args: [req.params.key]
    };

    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);
        if(resolvedData.sellState == 'selling')res.locals.button = true;
        else res.locals.button =false;
        return res.render('shop/product-page',{items:resolvedData,layout:'../shop/home-page'});
    }).catch(function(err){
        console.log(err);
    });
    
}

exports.clothAllGET2 = function(req,res){
    getData(req).then(function(data){
        if(data == null) res.json("error");
        console.log("data :"+data);
        res.json(data);
        // return res.render('shop/cloth/clothAll',{items:item,layout:'../shop/home-page'});
    }).catch(function(err){
        console.log(err);
    })
}
exports.clothAllGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    var returnQueryValue1="";
    
    var itemCategory = 'cloth';


    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'queryItemByCategory',
        // args: ['']
        args: [itemCategory]
    };

    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        // console.log(resolvedData);  
        return res.render('shop/cloth/clothAll',{items:resolvedData,layout:'../shop/home-page'});
        // return res.json(resolvedData);
    }).catch(function(err){
        console.log(err);
    });

}



function PromiseTest(getData){
    return new Promise(function(resolve,reject){
        console.log("HE");
        setTimeout(()=>{
            console.log('here!');
            resolve(getData+1);
        },3000);
    });
}