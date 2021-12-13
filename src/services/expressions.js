const expresiones = {
    userValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // Letters, numbers, dash, and underscore
    passValidation: /^[a-zA-Z0-9\_\-]{7,20}$/, // 7 to 20 digits.
    mailValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    nameValidation: /^[a-zA-Z0-9\u00C0-\u017F\s]+$/, // Alphanumeric and space
    bool: /^[01]$/, //Zero or one
    invalidNumber: 'Must be a numeric value',
    invalidDate: 'Invalid date entered',
    required: 'Data is missing',
    invalidName: 'Name should not have symbols',
    invalidUser: 'User with no special characters',
    invalidPass: 'Password with no special characters',
    invalidMail: 'Invalid email',
    secret: 'monasaferprivatekeytoken'
}

module.exports = expresiones;