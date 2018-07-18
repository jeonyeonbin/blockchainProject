var FabricQuery = require('../../hyperledger-fabric/query');
exports.categoryAllGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }

    var request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'fabcar',
        // fcn: 'queryAllCars',
        fcn: 'queryItemByCategory',
        // args: ['']
        args: [req.params.itemCategory]
    };

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