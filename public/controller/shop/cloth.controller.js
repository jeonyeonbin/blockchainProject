


var ItemModel = require('../../models/item.model');

var FabricQuery = require('../../hyperledger-fabric/query');
var FabricInvoke = require('../../hyperledger-fabric/invoke');

var requestReturn = require('../returnRequest');
exports.test = function(req,res){
    // var requestArgs = [req.body.data,]

    var requst = requestReturn('querySellProductByList',['sumin974#20180605/1505','sumin974#20180605/1506']);
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

exports.clothSelectOneGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    console.log("진입");
    var request = requestReturn('queryItem',[req.params.key]);
    //상품 조회수 1증가
    FabricInvoke(requestReturn('increasHits',[req.params.key])).then((resolvedData)=>{
        console.log('sucess');
    }).catch(()=>{
        console.log('fail');
    });

    //상품 조회
    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);

        //판매 여부 
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
    var itemCategory = 'cloth';
    var request = requestReturn('queryItemByCategory',[itemCategory]);
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