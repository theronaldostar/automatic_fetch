/** @license automatic-fetch v1.0.0
  * automatic-fetch.js
  *
  * Copyright (c) since 2020 Boteasy, all rights reserved.
  *
  * This file is open source for you to make requests via AJAX.
  * Developed By Ronaldo from Boteasy.
  *	More information at: (https://github.com/theronaldostar/automatic_fetch)
*/
function $(element) {

	let url = element.link === undefined || element.link === null || element.link === "" || element.link === {} ? `${this.origin}/` : element.link;
	let method = element.method === undefined || element.method === null || element.method === "" || element.method === {} ? "GET" : element.method.toUpperCase();
	let headers = new Headers(element.headers === undefined || element.headers === null || element.headers === {} ? [] : element.headers);
	let bodyParams = new URLSearchParams(Object.entries(element.body === undefined || element.body === null || element.body === {} ? [] : element.body));
	
	const dataType = element.dataType === undefined || element.dataType === null || element.dataType === "" || element.dataType === {} ? "json" : element.dataType;
	const success = element.success === undefined || element.success === null || element.success === "" || element.success === {} ? () => {} : element.success;
	const error = element.error === undefined || element.error === null || element.error === "" || element.error === {} ? () => {} : element.error;

	if (method !== "GET") headers.append("Content-Type", "application/x-www-form-urlencoded");

	headers.append("Content-Type", "charset=utf-8");
	bodyParams = bodyParams !== undefined && bodyParams !== null && method === "GET" ? `?${bodyParams.toString()}` : bodyParams.toString();

	const anywhere = "//cors-anywhere.herokuapp.com/";
	const endLink = method === "GET" ? bodyParams : "";
	const body = bodyParams !== undefined && bodyParams !== null && method !== "GET" ? bodyParams : null;
	const link = element.cors !== undefined && element.cors === true ? anywhere+url+endLink : url+endLink;

	let _data_ = {
		responseText: undefined,
		responseJSON: undefined,
		type: "ethernet",
		status: "net_ERR::INTERNET::NETWORK",
		statusText: "Error on your internet."
	};

	fetch(link, {
		method: method,
		headers: headers,
		body: body
	}).then(async response => {

		if (!response.ok) {

			let rolve = response.text();
			_data_.type = response.type;
			_data_.status = response.status;
			_data_.statusText = response.statusText;

			await rolve.then(data => {
				_data_.responseText = data;
				_data_.responseJSON = JSON.parse(data);
				throw _data_;
			});
		};
		return response[dataType]();
	}).then(success).catch(() => error(_data_));
};
