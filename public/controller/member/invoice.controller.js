
const delibee = require('delibee')({
    timeout: 10000, // default timeout value is '10000'
    locale: 'ko' // default loca le is 'ko'
})

exports.checkInvoice =async(req,res) =>{
    const company = req.query.company;
    const invoiceNo = req.query.invoice_no;

    const invoice = await delibee.tracking(company,invoiceNo);
    console.log(invoice);
    invoice.invoice.history.forEach((ele)=>{
        console.log(ele);
    });
    const history = invoice.invoice.history;    //현재까지 위치 추적후 알려주기
    const companyName = invoice.invoice.deliveryCompany.name;    // 택배회사 이름
    const receiverName = invoice.invoice.receiverName;          // 받는사람 이름
    const senderName = invoice.invoice.senderName;
    return res.render('member/invoice',{senderName:senderName,receiverName:receiverName,companyName:companyName,history:history,layout:false});
}