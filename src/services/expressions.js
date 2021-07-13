const expresiones = {
	userValidation: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, numeros, guion y guion_bajo
	passValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // 7 a 20 digitos.
	mailValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	nameValidation: /^[-\w\s]+$/, // Alfanumerico y espacio,
	bool: /^[01]$/, //Cero o uno
}

module.exports = expresiones;