const expresiones = require('../expressions')
const yup = require('yup');

const expendSchema = yup.object().shape({
    descr: yup.string().matches(expresiones.descrValidation, 'La descripcion no debe tener simbolos ni caracteres especiales').required(),
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
    expendSchema,
};
