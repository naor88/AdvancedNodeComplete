const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

const key = `naorTest/${uuid()}.jpeg`;
const params = {
    Bucket: 'blog-image-bucket',
    Fields: {
      key
    }
};
s3.createPresignedPost(params, async function(err, data) {
    if (err) {
        console.error('Presigning post data encountered an error', err);
    } else {
        console.log('The post data is', data);

        const file = await fs.readFileSync('./testJPEG.jpeg');
        fs.readFile()

        console.log(`file.type: ${file.type}`);        

        const upload = await axios.post(data.url, file, {
            headers: {
              'Content-Type': file.type
            }
        });
    }
});


const dataExample = { 
    url: 'https://s3.amazonaws.com/blog-image-bucket',
    fields: { 
        key: 'key',
        bucket: 'blog-image-bucket',
        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
        'X-Amz-Credential': 'AKIAVRVME4JOKLHVFDOQ/20191207/us-east-1/s3/aws4_request',
        'X-Amz-Date': '20191207T112959Z',
        Policy: 'eyJleHBpcmF0aW9uIjoiMjAxOS0xMi0wN1QxMjoyOTo1OVoiLCJjb25kaXRpb25zIjpbeyJrZXkiOiJrZXkifSx7ImJ1Y2tldCI6ImJsb2ctaW1hZ2UtYnVja2V0In0seyJYLUFtei1BbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJYLUFtei1DcmVkZW50aWFsIjoiQUtJQVZSVk1FNEpPS0xIVkZET1EvMjAxOTEyMDcvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsiWC1BbXotRGF0ZSI6IjIwMTkxMjA3VDExMjk1OVoifV19',
        'X-Amz-Signature': '69c931021d64cfd53522084facc2b64749d6578a9fa43d1042f1c9562c0a782c' 
    } 
}