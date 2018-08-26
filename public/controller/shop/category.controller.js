var FabricQuery = require('../../hyperledger-fabric/query');
var makeReuqest = require('../returnRequest');
exports.categoryAllGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }

    var request = makeRequest('queryItemByCategory',[req.params.itemCategory]);
    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        // console.log(resolvedData);  
        return res.render('shop/category/categoryAll',{itemCategory:req.params.itemCategory,items:resolvedData,layout:'../shop/home-page'});
        // return res.json(resolvedData);
    }).catch(function(err){
        console.log(err);
    });

}