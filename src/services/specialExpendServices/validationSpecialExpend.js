const expresiones = require('../expressions')
const yup = require('yup');

const specialExpendSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(expresiones.required),
    value: yup.number().typeError(expresiones.invalidNumber).positive().required(expresiones.required),
    finish_date: yup.date(expresiones.invalidDate).nullable(true),
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
    specialExpendSchema,
};