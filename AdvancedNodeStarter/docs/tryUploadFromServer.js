const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const uuid = require('uuid/v1');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync('./testJPEG.jpeg');

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'blog-image-bucket',
        Key: `${(new Date()).toISOString()}/testJPEG.jpg`, // File name you want to save as in S3
        Body: fileContent,
        ACL: "public-read"
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile();