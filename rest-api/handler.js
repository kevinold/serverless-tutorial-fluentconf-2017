import uuid from 'uuid';
import AWS from 'aws-sdk';
import { success, failure } from './utils/responseUtils';

AWS.config.update({ region: process.env.REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const contactsTable = process.env.CONTACTS_TABLE;

export async function createContact (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: contactsTable,
    Item: {
      id: uuid.v1(),
			fullname: requestBody.fullname,
			phone: requestBody.phone,
      createdAt: new Date().getTime(),
    },
  };

  dynamoDb.put(params, (err, data) => {
    if (err) {
			callback(null, failure({err, data}));
      return;
    }
		
		// Successful
		callback(null, success(params.Item));
  });
}

export async function listContacts (event, context, callback) {
  const params = {
    TableName: contactsTable
  };

  dynamoDb.scan(params, (err, data) => {
    if (err) {
			callback(null, failure({err, data}));
      return;
    }

		// Successful
		callback(null, success(data));
  });
}

export async function getContact (event, context, callback) {
  const params = {
    TableName: contactsTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.get(params, (err, result) => {
    if (err) {
			callback(null, failure({err, result}));
      return;
    }

		// Successful
		callback(null, success(result.Item));
  });
}

export async function updateContact (event, context, callback) {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: contactsTable,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
			':fullname': requestBody.fullname,
			':phone': requestBody.phone,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET fullname = :fullname, phone = :phone, updatedAt = :updatedAt',
    ReturnVAlues: 'ALL_NEW'
  };

  dynamoDb.update(params, (err, result) => {
    if (err) {
			callback(null, failure({err, result}));
      return;
    }
		
		// Successful
		callback(null, success(result.Attributes));
  });
}

export async function deleteContact (event, context, callback) {
  const params = {
    TableName: contactsTable,
    Key: {
      id: event.pathParameters.id
    }
  };

  dynamoDb.delete(params, (err, result) => {
    if (err) {
			callback(null, failure({err, result}));
      return;
    }

		// Successful
		callback(null, success());
  });
}
