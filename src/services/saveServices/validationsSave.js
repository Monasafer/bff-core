const expresiones = require('../expressions')
const yup = require('yup');

const createSaveSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(expresiones.required),
    value: yup.number().typeError(expresiones.invalidNumber).positive().required(expresiones.required),
    month: yup.date().typeError(expresiones.invalidDate).required(expresiones.required),
});

const updateSaveSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(expresiones.required),
    value: yup.number().positive().required(expresiones.required),
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
    createSaveSchema,
    updateSaveSchema,
};