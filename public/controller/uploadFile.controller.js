const aws = require('aws-sdk');

module.exports = function fileUpload(req) {
  return new Promise(((resolve, reject) => {
    let url;
    if (req.files === undefined) {
      reject(new Error('file is none'));
    }
    req.files.forEach((fileObj, index) => {
      // 라우터에 Multer 객체를 연결하면 input name이 일치하는 파일 데이터를 자동으로 받아서 req.files를 통해 접근할 수 있게 처리해 줍니다.
      // 메모리 버퍼에 저장하는 형태를 선택했으므로 fileObj는 다음과 같은 속성을 갖게 됩니다.
      // fileObj.buffer //예) Buffer 객체
      // fileObj.originalname //예) abc.jpg
      // fileObj.mimetype //예)'image/jpeg'

      // 아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
      const s3obj = new aws.S3();
      const s3Params = {
        Bucket: 'bc2018-s3',
        Key: `uploads/${req.session.name}${fileObj.originalname}${new Date().toString()}`,
        ACL: 'public-read',
        ContentType: fileObj.mimetype,
        Body: fileObj.buffer,
      };

      s3obj.upload(s3Params)
        .on('httpUploadProgress', (evt) => { console.log(evt); })
        .send((err, data) => {
          // S3 File URL
          if(index != 0) url += ','+data.Location;
          else url = data.Location;
          //url = data.Location;
          // 어디에서나 브라우저를 통해 접근할 수 있는 파일 URL을 얻었습니다.
          console.log(url);
        });
      });
      resolve(url);
  }));
};
