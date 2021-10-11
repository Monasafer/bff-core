const expresiones = require('../expressions')
const yup = require('yup');

const createUserSchema = yup.object().shape({
    user: yup.string().min(6, 'Minimo deben ser 7 caracteres').matches(expresiones.userValidation, expresiones.invalidUser).required(expresiones.required),
    pass: yup.string().min(10, 'Minimo contraseña de 7 caracteres').matches(expresiones.passValidation).required(expresiones.required),
    mail: yup.string().matches(expresiones.mailValidation).typeError(expresiones.invalidMail).required()
});

const updateUserSchema = yup.object().shape({
    pass: yup.string().min(10, 'Minimo contraseña de 7 caracteres').matches(expresiones.passValidation).required(expresiones.required),
    new_pass: yup.string().min(10, 'Minimo contraseña de 10 caracteres').matches(expresiones.passValidation).required(expresiones.required),
});

const validate = (schema) => async(req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body);
        next();
    } catch (error) {
        next(error);
    }
}

const validateupdate = (schema) => async(req, res, next) => {
    let pass = req.headers['pass'];
    let new_pass = req.headers['new_pass'];
    let body = { pass, new_pass }
    try {
        if (pass == new_pass) throw new Error("La antigua y nueva contraseña no pueden ser iguales");
        await schema.validate(body);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validate,
    createUserSchema,
    validateupdate,
    updateUserSchema,
};