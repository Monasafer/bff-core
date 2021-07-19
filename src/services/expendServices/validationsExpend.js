const expresiones = require('../expressions')
const yup = require('yup');

const createExpendSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, 'Name should not have symbols').required(),
    value: yup.number().positive().required(),
    month: yup.date().required(),
});

const updateExpendSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, 'Name should not have symbols').required(),
    value: yup.number().positive().required(),
});

const validate = (schema) => async (req,res,next)=>{
    const body = req.body;
    try{
        await schema.validate(body);
        next();
    }catch(error){
        next(error);
    }
}

module.exports = {
    validate,
    updateExpendSchema,
    createExpendSchema
};

