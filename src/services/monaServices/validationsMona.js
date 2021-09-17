const expresiones = require('../expressions')
const yup = require('yup');

const createMonaSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(),
    value: yup.number().typeError(expresiones.invalidNumber).positive().required(),
    month: yup.date().typeError(expresiones.invalidDate).required(),
});

const updateMonaSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(),
    value: yup.number().typeError(expresiones.invalidDate).positive().required(),
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

module.exports = {
    validate,
    updateMonaSchema,
    createMonaSchema
};