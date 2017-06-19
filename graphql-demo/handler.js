import AWS from 'aws-sdk';
import { graphql } from 'graphql';
import { success, failure } from './utils/responseUtils';
import { publicSchema } from './lib/schema';

export function runGraphql(event, context, callback) {
  const requestBody = JSON.parse(event.body);
  console.log('Query: ', requestBody.query);
  console.log('Variables: ', requestBody.variables);

  graphql(publicSchema, requestBody.query, {}, null, requestBody.variables)
    .then(resp => {
      console.log('resp: ', resp);
      callback(null, success(resp));
    })
    .catch(err => {
      callback(null, failure(err));
    });
}

export function hello (event, context, callback) {
	callback(null, success('Hello World'));
}

