import AWS from 'aws-sdk';
import { success, failure } from './utils/responseUtils';

const s3 = new AWS.S3();

const bucket = process.env.S3_BUCKET;
const csvFile = process.env.CSV_FILE;
const jsonFile = process.env.JSON_FILE;

function processData(data) {
	return data;
}

export async function parseCSV(event, context, callback) {
  s3.getObject({
    Bucket: bucket,
    Key: csvFile
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {

      const resultJSON = processData(data.Body.toString());

      s3.putObject({
        Bucket: bucket,
        Key: jsonFile,
        ContentType: 'application/json',
        Body: JSON.stringify(resultJSON)
      }, (err, data) => {
				callback(null, failure({err, data}));
        return data;
      });

      s3.deleteObject({
        Bucket: bucket,
        Key: csvFile,
      }, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

      try {
				callback(null, success(resultJSON));
			}
			catch(err) {
				callback(null, failure({ err }));
			}
    }
  });
};

export function readJSON(event, context, callback) {
  s3.getObject({
    Bucket: bucket,
    Key: jsonFile
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      try {
				callback(null, success(data.Body.toString()));
			}
			catch(err) {
				callback(null, failure({ err }));
			}
    }
  });
};
