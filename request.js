$Ajax({
	link: "", // URL da api-rest
	method: "", // GET, POST, PUT, DELETE...
	body: {}, // Corpo da requisição
	cors: false, // Enviar este parâmetro como "true" caso queira efetuar requisições.. ou envio com bloqueio CORS
	dataType: "json", // Retorno da requisição, "json" ou "text" padrão é json
	success: (event) => {}, // Retorno de Sucesso.
	error: (event) => {} // Retorno de Erro.
});
