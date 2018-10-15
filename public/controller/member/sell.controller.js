var FabricQuery = require('../../hyperledger-fabric/query');
var makeRequest = require('../returnRequest');
var fileUpload = require('../uploadFile.controller');
var FabricInvoke = require('../../hyperledger-fabric/invoke');



const delibee = require('delibee')({
    timeout: 10000, // default timeout value is '10000'
    locale: 'ko' // default loca le is 'ko'
})
//판매 상품 보기
exports.showSellProductAllGET= function(req,res){
    var myId = req.session.name;
    //세션 ID로 판매상품 검색
    var request = makeRequest('queryItemBySeller',[myId]);
    var transactionInfo;            // transactionInfo
    var items;
    FabricQuery(request).then((resolvedData)=>{
        items = JSON.parse(resolvedData);
        FabricQuery(makeRequest('queryTransactionInfoBySeller',[myId])).then((result)=>{
            transactionInfo = JSON.parse(result);                   //결과값 삽입
            
            var count = 0;
            //item 정보에 transInfo 넣어주기
            items.forEach(function(item,idx){
                    count = 0;
                    transactionInfo.some(function (ele){
                        if(count == 0 && item.key == ele.itemKey){
                            item.transInfo = ele;
                            item.confirmTransaction = 'true';
                            return true;
                        }  
                    });
                    if(item.confirmTransaction =='' || item.confirmTransaction == undefined || item.confirmTransaction == null) item.confirmTransaction='false'; 

                
            });
             
            //console.log(items);
            console.log(transactionInfo);
            return res.render('member/myProduct',{items:items,layout:'../shop/home-page'});
        }).catch((err)=>{
            return res.render('500',{error:err});
        })
    }).catch((e)=>{
       console.log(e);
    });
};

exports.showSellOneProduct = function(req,res){
    //판매 물품 키값
    var uuid = req.params.key;
    //판매 물품 키값으로 조회
    var request = makeRequest('queryItem',[uuid]);

    FabricQuery(request).then((resolvedData)=>{
        
        //hbs에는 JSON 형태로 보내줘야댐
        resolvedData = JSON.parse(resolvedData);
        return res.render('member/showProductOne',{itemInfo:resolvedData,layout:'../shop/home-page'});        
    }).catch((e)=>{
      console.log(e);
    })

}
exports.updateProduct = function(req,res){
    console.log('---------------------------------------------');
    console.log('transactionMode'+ req.body.transactionMode);
    console.log('transactionPosition '+ req.body.transactionPosition);
    console.log('deliveryFee' + req.body.deliveryFee);
    console.log('itemKey : '+ req.body.itemKey);
    console.log('---------------------------------------------');
    
    // console.log(req.files);
    /*
    [Multer 초기화]
    웹   서버에서 파일 업로드 버퍼를 처리하되 물리적으로 파일을 저장하지 않기 위해 메모리 스토리지 타입의 객체를 생성합니다.
    웹 서버에 물리적으로 저장하는 것보다 아마존 S3 등을 이용하는 것이 좋은 이유는,
    로드 밸런서 등을 활용하여 여러 웹 서버가 같은 Node.js 웹 서비스를 제공할 때 특정 서버만 파일을 보유하게 되는 현상 등이 생기는 것을 미연에 방지할 수 있기 때문입니다.
    필요할 경우 메모리 스토리지 대신 다른 스토리지를 써도 됩니다.
    */ 
    //등록하는사람의 아이디 + 현재시간 
    var PicURL;
    if(req.body.transactionMode == '1'){
        req.body.deliveryFee = '0';
    }
    console.log(req.body.deliveryFee);
    fileUpload(req).then(function(url){
        PicURL = url;
        console.log("Promise : "+PicURL);
        return PicURL;   
    }).then((PicURL)=>{
    // 0, itemKey
	// 1, itemName
	// 2, itemInfo
	// 3, itemPrice
	// 4, itemCategory
	// 5, itemPic
	// 6, itemContentsPic
	// 7, sellState (1 : 판매중, 2 : 거래중, 3 : 판매완료, 4 : 판매취소)
	// 8, transactionMode (1 : 직거래, 2 : 택배거래, 3 : 직거래 및 택배거래 모두 가능)
	// 9, transactionPosition
	// 10, deliveryFee (1 : 판매자부담, 2 : 착불)


    console.log('itemKey  : ' + req.body.itemKey);
    console.log('itemName  : ' + req.body.itemName);
    console.log('itemInfo  : ' + req.body.itemInfo);
    console.log('itemPrice  : ' + req.body.itemPrice);
    console.log('itemCategory  : ' + req.body.itemCategory);
    console.log(' PicURL.split(',')[0])  : ' + PicURL.split(',')[0]);
    console.log('PicURL  : ' + PicURL);
    console.log('sellState  : ' + req.body.sellState);
    console.log('transactionMode  : ' + req.body.transactionMode);
    console.log('transactionPosition  : ' + req.body.transactionPosition);
    console.log('req.body.deliveryFee' + req.body.deliveryFee);


    var request = makeRequest('updateItem',[req.body.itemKey,req.body.itemName,req.body.itemInfo,req.body.itemPrice,req.body.itemCategory,PicURL.split(',')[0],PicURL,req.body.sellState,req.body.transactionMode,req.body.transactionPosition,req.body.deliveryFee]);
     console.log("Pic URL :"+PicURL);
     return request;
    }).then((request)=>{
        FabricInvoke(request).then((resolvedData)=>{
            return res.redirect(303,'/myPage/showMySellProduct');
        }).catch((err)=>{
            return res.send('fail');
        });
    }).catch((err)=>{
        console.log("file Error : "+err);
    });
}

exports.updateDelivery = async(req,res) =>{



    var transactionInfoKey = req.body.transactionInfoKey; //트랜잭션 번호
    var deliveryCompany = req.body.company;               //송장 회사
    var deliveryInvoice = req.body.number;                //송장 번호
    var transactionState ='2';                            //배송중으로 알림
    
    const company = req.query.company;
    const invoiceNo = req.query.invoice_no;

    const invoice = await delibee.tracking(deliveryCompany,deliveryInvoice);
    console.log(invoice);
    
    if(invoice.success ==false) return res.send('false');
    invoice.invoice.history.forEach((ele)=>{
        console.log(ele);
    });
    
    const history = invoice.invoice.history;    //현재까지 위치 추적후 알려주기
    const companyName = invoice.invoice.deliveryCompany.name;    // 택배회사 이름
    const receiverName = invoice.invoice.receiverName;          // 받는사람 이름
    
    
    var request = makeRequest('updateTransactionInfoForDelivery',[transactionInfoKey,deliveryCompany,deliveryInvoice,transactionState]);

    FabricInvoke(request).then((result)=>{
        console.log(result);
        return res.send('true');
    }).catch((err)=>{
        console.log(err);
        return res.send('false');
    })

}

exports.sellerChangeTransacationState = function(req,res){
    
    var seller = req.session.name;  // 판매자 아이디
    var itemKey = req.body.itemKey; // 아이템 ID
    var transactionKey = req.body.transactionKey // 트랜잭션 ID
    var transactionState = req.body.transactionState // 트랜재션 스테이트

    
    FabricInvoke(makeRequest('updateTransactionInfoForConfirmBySeller',[transactionKey,'2'])).then(()=>{
        return res.send('success');
    }).catch(()=>{
        return res.send('fail');
    });
}

exports.checkApprove = function(req,res){
    var transactionKey = req.body.transactionKey;           //트랜잭션 키
    var transactionState = req.body.transactionState;       //상태 값(3,4)

    FabricInvoke(makeRequest('updateTransactionInfoForState',[transactionKey,transactionState])).then(()=>{
        return res.send('success');
    }).catch(()=>{
        return res.send('fail');
    })

}

/* 판매 취소 */
exports.ItemCancel = (req,res)=>{

    var request = makeRequest('deleteItem',[req.body.itemKey]);

    
    FabricInvoke(request).then(()=>{
        return res.send('success');
    }).catch(()=>{
        return res.send('fail');
    })
}