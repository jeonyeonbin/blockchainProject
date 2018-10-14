var ItemModel = require('../../models/item.model');
var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
exports.test = function(req,res){
    // var requestArgs = [req.body.data,]
  
}
exports.allGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    var request = makeRequest('queryItemAll',[]);
    FabricQuery(request).then(function(resolvedData){
        return resolvedData;    
    }).then(function(resolvedData){
        resolvedData = JSON.parse(resolvedData);
        console.log(resolvedData);

        FabricQuery(makeRequest('queryItemCountAll',[])).then( count =>{
            
            count = JSON.parse(count);
            return count;

        }).then(count =>{
            
            if(resolvedData.sellState == 'selling')res.locals.selling = true;
            else res.locals.selling =false;
            return res.render('shop/mainList',{count:count.queryResultCount,items : resolvedData,layout:'../shop/home-page'});
        })

    }).catch(function(err){
        
        console.log(err);
    });
}