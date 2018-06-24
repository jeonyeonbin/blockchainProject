exports.mainGET = function(req,res){
    if(req.session.authorized == true) {
        res.locals.authorized = true;
    }
    res.render('index');
}