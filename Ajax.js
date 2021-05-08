/** @license Ajax-fetch v1.0
 * Ajax.js
 * 
 *TODO: Copyright (c) since 2020 Boteasy, all rights reserved.
 * 
 *? This file is open source for you to make AJAX requests;
 *? Developed By Ronaldo from Boteasy;
 *! More information at: https://github.com/theronaldostar/Ajax-fetch.
*/
function $Ajax(event) {

	let url = event.url === undefined || event.url === null || event.url === "" || event.url === {} ? `${self.origin}/` : event.url;
	let method = event.method === undefined || event.method === null || event.method === "" || event.method === {} ? "GET" : event.method.toUpperCase();
	let headers = new Headers(event.headers === undefined || event.headers === null || event.headers === {} ? [] : event.headers);
	let dataParams = new URLSearchParams(Object.entries(event.data === undefined || event.data === null || event.data === {} ? [] : event.data));

	const dataType = event.dataType === undefined || event.dataType === null || event.dataType === "" || event.dataType === {} ? "json" : event.dataType;
	const success = event.success === undefined || event.success === null || event.success === "" || event.success === {} ? () => {} : event.success;
	const error = event.error === undefined || event.error === null || event.error === "" || event.error === {} ? () => {} : event.error;

	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("Content-Type", "charset=utf-8");
	dataParams = dataParams !== undefined && dataParams !== null && method === "GET" ? `?${dataParams.toString()}` : dataParams.toString();

	const anywhere = "//cors-anywhere.herokuapp.com/";
	const endLink = method === "GET" ? dataParams : "";
	const data = dataParams !== undefined && dataParams !== null && method !== "GET" ? dataParams : null;
	const link = event.cors !== undefined && event.cors === true ? anywhere+url+endLink : url+endLink;

	let dataError = {
		responseText: undefined,
		responseJSON: undefined,
		type: "ethernet",
		status: "net::ERR_INTERNET::ERR_NETWORK",
		statusText: "Error on your internet."
	};

	fetch(link, {method: method, headers: headers, body: dataError}).then(async response => {
		if (!response.ok) {
			let resolve = response.text();
			dataError.type = response.type;
			dataError.status = response.status;
			dataError.statusText = response.statusText;
			await resolve.then(res => {
				dataError.responseText = res;
				dataError.responseJSON = JSON.parse(res);
				throw dataError;
			});
		};
		return response[dataType]();
	}).then(success).catch(() => error(dataError));
};
