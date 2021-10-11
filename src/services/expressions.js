const expresiones = {
    userValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // Letters, numbers, dash, and underscore
    passValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // 7 to 20 digits.
    mailValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    nameValidation: /^[-\w\s]+$/, // Alphanumeric and space
    bool: /^[01]$/, //Zero or one
    invalidNumber: 'Must be a numeric value',
    invalidDate: 'Invalid date entered',
    required: 'Data is missing',
    invalidName: 'Name should not have symbols',
    invalidUser: 'User with no symbols between 7 and 20 characters',
    invalidMail: 'Invalid email',
    secret: 'monasafer-private-key-token-'
}

module.exports = expresiones;