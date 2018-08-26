var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
exports.clothSelectOneGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }

    var reuqest = makeRequest('queryOneItem',[key]);
    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);  
        return res.render('shop/product-page',{items:resolvedData,layout:'../shop/home-page'});
        // return res.json(resolvedData);
    }).catch(function(err){
        console.log(err);
    });
    
    // ItemModel.findOne({itemCategory:req.params.itemCategory,itemName:req.params.itemName},function(err,item){
    //     if(err){
    //         console.error(err.stack);
    //     }
    //     if(!item){
    //         console.log('없는 데이터 !!');
    //         return res.redirect(303,'/cloth');
    //     }
        
    //     return res.render('shop/product-page',{items:item,layout:'../shop/home-page'});
    // });
}