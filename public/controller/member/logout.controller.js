exports.logoutGET = function(req,res){
    res.locals.authorized = false;
    req.session.authorized = false;
    req.session.id= "";
    req.session.pw = "";
    req.session.destroy(function(err){
        console.error(err);
        // cannot access session here
    });

     res.redirect(303,'/shopPage');
}