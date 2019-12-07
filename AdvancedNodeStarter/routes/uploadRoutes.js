const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

// https://medium.com/@ashan.fernando/upload-files-to-aws-s3-using-signed-urls-fa0a0cf489db
const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    const params = {
      Bucket: 'blog-image-bucket',
      Fields: {
        key,
        success_action_status: '201',
      }
    };

    s3.createPresignedPost(params,
      (err, data) => res.send(data)
    );
  });
};
