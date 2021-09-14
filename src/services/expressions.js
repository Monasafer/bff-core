const expresiones = {
	userValidation: /^[a-zA-Z0-9\_\-]{6,16}$/, // Letters, numbers, dash, and underscore
	passValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // 7 to 20 digits.
	mailValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	nameValidation: /^[-\w\s]+$/, // Alphanumeric and space
	bool: /^[01]$/, //Zero or one
}

module.exports = expresiones;