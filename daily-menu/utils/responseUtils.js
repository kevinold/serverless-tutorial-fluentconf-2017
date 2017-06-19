export function success(body, headers) {
  return buildResponse(body, headers, 200);
}

export function failure(body, headers) {
  return buildResponse(body, headers, 500);
}

function buildResponse(body, headers, statusCode) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
			...headers
    },
    body: JSON.stringify(body),
  };
}
