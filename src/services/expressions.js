const expresiones = {
	userValidation: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letras, numeros, guion y guion_bajo
	passValidation: /^.{6,20}$/, // 6 a 20 digitos.
	mailValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	descrValidation: /^[a-zA-Z0-9\_\-]{1,25}$/, // Letras, numeros, guion y guion_bajo
}

module.exports = expresiones;