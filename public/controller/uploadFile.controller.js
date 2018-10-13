const aws = require('aws-sdk');

module.exports = function fileUpload(req) {
  return new Promise(((resolve, reject) => {
    if (req.files === undefined) {
      reject(new Error('file is none'));
    }
    filePromise(req.files,req.session.name).then((result)=>{
      
      console.log('HERE 5');
      console.log(result);
      console.log('HERE 6');
      
      resolve(result);
    });
  }));
};

/* 파일 프로미스 */
function filePromise(files,id){
  return new Promise((resolve,reject) =>{
      const s3obj = new aws.S3();
      let url = [];
      let count = 0;
      files.forEach((fileObj, index) => {
        // 라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.
        // 메모리 버퍼에 저장하는 형태를 선택했으므로 fileObj는 다음과 같은 속성을 갖게 됩니다.
        // fileObj.buffer //예) Buffer 객체
        // fileObj.originalname //예) abc.jpg
        // fileObj.mimetype //예)'image/jpeg'
      
        // 아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
        
        let s3Params = {
          Bucket: 'bc2018-s3',
          Key: `uploads/${id}${fileObj.originalname}${new Date().toString()}`,
          ACL: 'public-read',
          ContentType: fileObj.mimetype,
          Body: fileObj.buffer,
        };
        
        console.log('HERE 2');
        s3ObjPromise(s3obj,s3Params).then((result)=>{
          count++;
          url.push(result);
          url.pop(undefined);
          if(files.length == count) resolve(url);    
        });
    });
  });
}
    
    
function s3ObjPromise(s3obj,s3Params){
  return new Promise((resolve,reject) =>{
    s3obj.upload(s3Params)
          .on('httpUploadProgress', (evt) => { console.log(evt); })
          .send((err, data) => {
            // S3 File URL
          console.log('HERE 1');
          console.log(data.Location);
          resolve(data.Location);
            //url = data.Location;
            // 어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
      });      
  });
}