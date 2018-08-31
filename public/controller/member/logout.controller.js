exports.logoutGET = function(req,res){
    res.locals.authorized = false;
    req.session.authorized = false;
    req.session.name = undefined;
    req.session.destroy(function(err){
        console.error(err);
        // cannot access session here
    });

     res.redirect(303,'/shopPage');
}