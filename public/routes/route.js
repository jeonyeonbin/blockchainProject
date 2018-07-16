var port = 5555;
var path = require('path');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser =require('body-parser');

module.exports=function(app){
    //handlebar 순서 중요!!
    var handlebars =require('express-handlebars').create({
        extname:'hbs',
        defaultLayout:path.join(__dirname,'../views/layouts/main.hbs'),
        partialsDir:path.join(__dirname,'../views/partials'),
    });
    
    app.engine('hbs',handlebars.engine).set('view engine','hbs');
    app.set('views',path.join(__dirname,'../views'));

    //post 처리 하기위한 shopPage
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    // [ Database 처리 ]
    var db = mongoose.connection;
    db.on('error',console.error);
    db.once('open',function(){
        //connected Mongo DB
        console.log('Open Mongo DataBase!!');
    });
    try{
        mongoose.connect('mongodb://jyb:qtrhpr12@ds115360.mlab.com:15360/bc2018');
    }catch(err){
        console.error(err);
    }    
    //session 설정
    app.use(session({
        resave:false,
        saveUninitialized:false,
        secret: '%$MYSECRET$%',
        store:require('mongoose-session')(mongoose),
    }));
    app.use(bodyParser.json());
    //page url 처리 라우터
    var page = require('./page')(app);

    app.use('/board',require('./boardRoute'));  //board router
    app.use('/shopPage',require('./shopPageRoute'));   //shopPage
    app.use('/myPage',require('./myPageRoute'));
    app.use('/testing',require('./testingRoute'));
    //404 에러 페이지
    app.use(function(req,res,next){
        res.status(404);
        res.render('404');
        next();
    });
    //서버 에러 페이지
    app.use(function(err,req,res,next){
        if(err) console.error(err.stack);
        res.status(500);
        res.render('500');
        next();
    });
    // 포트로 시작
    app.listen(port,function(){
        console.log('Server Started!!');
    });
};
