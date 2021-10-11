const expresiones = require('../expressions')
const yup = require('yup');

const createSpecialExpendSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, expresiones.invalidName).required(expresiones.required),
    capacity: yup.number().typeError(expresiones.invalidNumber).positive().required(expresiones.required),
    month: yup.date().typeError(expresiones.invalidDate).nullable(true).required(expresiones.required),
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
    createSpecialExpendSchema,
};