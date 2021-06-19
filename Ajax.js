/** @license Ajax-fetch v1.1
	* Ajax.js
	* 
	* Copyright (c) since 2020 Boteasy, all rights reserved.
	* 
	* This file is open source for you to make AJAX requests;
	* Developed By Ronaldo from Boteasy;
	* More information at: https://github.com/theronaldostar/Ajax-fetch
*/
function $Ajax(event) {

	let url = event.url === undefined || event.url === null || event.url === "" || event.url === {} ? `${window.location.origin}/` : event.url;
	let method = event.method === undefined || event.method === null || event.method === "" || event.method === {} ? "GET" : event.method.toUpperCase();
	let headers = new Headers(event.headers === undefined || event.headers === null || event.headers === {} ? [] : event.headers);
	let dataParams = new URLSearchParams(Object.entries(event.data === undefined || event.data === null || event.data === {} ? [] : event.data));

	const dataType = event.dataType === undefined || event.dataType === null || event.dataType === "" || event.dataType === {} ? "json" : event.dataType;
	const success = event.success === undefined || event.success === null || event.success === "" || event.success === {} ? () => {} : event.success;
	const error = event.error === undefined || event.error === null || event.error === "" || event.error === {} ? (error) => console.error(error) : event.error;

	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("Content-Type", "charset=utf-8");
	dataParams = dataParams !== undefined && dataParams !== null && method === "GET" ? `?${dataParams.toString()}` : dataParams.toString();

	const anywhere = "//cors-anywhere.herokuapp.com/";
	const endLink = method === "GET" ? dataParams : "";
	const params = dataParams !== undefined && dataParams !== null && method !== "GET" ? dataParams : null;
	const link = event.cors !== undefined && event.cors === true ? anywhere+url+endLink : url+endLink;

	let _error = {
		responseText: undefined,
		responseJSON: undefined,
		type: "ethernet",
		status: "net::ERR_CONNECTION_CLOSED",
		statusText: "There was an error connecting check your internet"
	};

	fetch(link, {method: method, headers: headers, body: params}).then(async (response) => {
		if (!response.ok) {
			let resolve = response.text();
			_error.type = response.type;
			_error.status = response.status;
			_error.statusText = response.statusText;
			await resolve.then((event) => {
				_error.responseText = event;
				_error.responseJSON = JSON.parse(event);
				throw _error;
			});
		};
		return response[dataType]();
	}).then(success).catch(() => error(_error));
};
