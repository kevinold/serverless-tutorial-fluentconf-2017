"use strict";

module.exports.greeting = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello!!!",
    })
  };

  callback(null, response);
};

module.exports.personalGreeting = (event, context, callback) => {

	if (!event.body) {
		const response = {
			statusCode: 400,
			body: 'Please post a name in the body'
		};

		callback(null, response);
	}

  const requestBody = JSON.parse(event.body);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${requestBody.name}!!!`,
    })
  };

  callback(null, response);
};
