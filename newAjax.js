/** @license newAjax v1.0
 * newAjax.js
 * 
 * Copyright (c) since 2020 Boteasy, all rights reserved.
 * 
 *? This file is open source for you to make requests via AJAX.
 *? Developed By Ronaldo from Boteasy.
 *! More information at: https://github.com/theronaldostar/newAjax
*/
const $Ajax = (event) => {

	let url = event.link === undefined || event.link === null || event.link === "" || event.link === {} ? `${this.origin}/` : event.link;
	let method = event.method === undefined || event.method === null || event.method === "" || event.method === {} ? "GET" : event.method.toUpperCase();
	let headers = new Headers(event.headers === undefined || event.headers === null || event.headers === {} ? [] : event.headers);
	let bodyParams = new URLSearchParams(Object.entries(event.body === undefined || event.body === null || event.body === {} ? [] : event.body));

	const dataType = event.dataType === undefined || event.dataType === null || event.dataType === "" || event.dataType === {} ? "json" : event.dataType;
	const success = event.success === undefined || event.success === null || event.success === "" || event.success === {} ? () => {} : event.success;
	const error = event.error === undefined || event.error === null || event.error === "" || event.error === {} ? () => {} : event.error;

	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("Content-Type", "charset=utf-8");
	bodyParams = bodyParams !== undefined && bodyParams !== null && method === "GET" ? `?${bodyParams.toString()}` : bodyParams.toString();

	const anywhere = "//cors-anywhere.herokuapp.com/";
	const endLink = method === "GET" ? bodyParams : "";
	const body = bodyParams !== undefined && bodyParams !== null && method !== "GET" ? bodyParams : null;
	const link = event.cors !== undefined && event.cors === true ? anywhere+url+endLink : url+endLink;

	let data = {
		responseText: undefined,
		responseJSON: undefined,
		type: "ethernet",
		status: "net::ERR_INTERNET::ERR_NETWORK",
		statusText: "Error on your internet."
	};

	fetch(link, {method: method, headers: headers, body: body}).then(async response => {
		if (!response.ok) {
			let resolve = response.text();
			data.type = response.type;
			data.status = response.status;
			data.statusText = response.statusText;
			await resolve.then(res => {
				data.responseText = res;
				data.responseJSON = JSON.parse(res);
				throw data;
			});
		};
		return response[dataType]();
	}).then(success).catch(() => error(data));
};
