const expresiones = require('../expressions')
const yup = require('yup');

const specialExpendSchema = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, 'Name should not have symbols').required(),
    value: yup.number().positive().required(),
    finish_date: yup.date().nullable(true),
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
    specialExpendSchema,
};
