import base64 from 'base-64';

const username = 'username';
const password = 'password';

export const doRequest = (endpoint, options = {}, headersObject = {}) => {

	let headers = new Headers({
		'Authorization': `Basic ${base64.encode(username + ':' + password)}`
	});

	for (let header in headersObject) {
    	if (!headersObject.hasOwnProperty(header)) continue;
    	headers.append(header, headersObject[header]);
    }

    const defaultOptions = {
		headers,
	}

	const finalOptions = Object.assign(defaultOptions, options);

	return fetch(endpoint, finalOptions);
}

export const doGet = (endpoint, options = {}, headersObject = {}) => {
	const defaultOptions = {
		method: 'GET',
	}

	const finalOptions = Object.assign(defaultOptions, options);

	return doRequest(endpoint, finalOptions, headersObject);
}

export const doPost = (endpoint, options = {}, headersObject = {}) => {
	const defaultOptions = {
		method: 'POST',
	}

	const finalOptions = Object.assign(defaultOptions, options);

	return doRequest(endpoint, finalOptions, headersObject);
}

export default doRequest;