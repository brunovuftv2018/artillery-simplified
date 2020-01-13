const AWS = require('aws-sdk');

let shards = [];

for (let i = 1; i<= 64; i++) {
  shards.push(i);
}

console.log('list shards', shards);

AWS.config.update({
  region: process.env.REGION
});

let kinesis = new AWS.Kinesis({
  apiVersion: '2013-12-02'
});

function saveToKinenis(data) {
  kinesis.putRecord(Object.assign({}, data, {
    StreamName: process.env.STREAM_NAME,
    PartitionKey: "shard" + shards[Math.round(Math.random() * 64)]
  }), function(err, data) {
    if (err) console.log('error kinesis', err, err.stack);
  });
}

module.exports = saveToKinenis;
