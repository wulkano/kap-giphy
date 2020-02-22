'use strict';
const fs = require('fs');
const FormData = require('form-data');

const action = async context => {
	const endpoint = 'https://upload.giphy.com/v1/gifs';
	const filePath = await context.filePath();

	context.setProgress('Uploading…');

	const form = new FormData();
	form.append('api_key', context.config.get('apiKey'));
	form.append('file', fs.createReadStream(filePath));

	const response = await context.request(endpoint, {
		method: 'post',
		body: form
	});
	const {id} = JSON.parse(response.body).data;

	context.copyToClipboard(`https://giphy.com/gifs/${id}`);
	context.notify('URL to the GIF has been copied to the clipboard');
};

const config = {
	apiKey: {
		title: 'API key',
		type: 'string',
		minLength: 13,
		default: '24j0dMD6Ml01YtYnEd3D3YvhsSgBmQw9', // Rate limited test key
		required: true
	}
};

const giphy = {
	title: 'Share to GIPHY',
	configDescription: 'The default API key is rate limited. In order to be able to upload more GIFs, create your own key here: https://developers.giphy.com/dashboard/',
	formats: [
		'gif'
	],
	action,
	config
};

exports.shareServices = [giphy];
