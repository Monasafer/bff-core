const expresiones = require('../expressions')
const yup = require('yup');

const BffCreateExpend = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(),
    value: yup.number().typeError(expresiones.invalidNumber).positive().required(expresiones.required),
    month: yup.date().typeError(expresiones.invalidDate).required(),
    fixed: yup.number().required(),
    dailyUse: yup.number().required()
});

const BffUpdateExpend = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(),
    value: yup.number().typeError(expresiones.invalidNumber).positive().required()
});

const BffCreateMonth = yup.object().shape({
    month: yup.date().typeError(expresiones.invalidDate).required()
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
    BffCreateExpend,
    BffUpdateExpend,
    BffCreateMonth
};