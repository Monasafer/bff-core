const expresiones = require('../expressions')
const yup = require('yup');

const createMonaSchema = yup.object().shape({
    descr: yup.string().matches(expresiones.descrValidation, 'La descripcion no debe tener simbolos ni caracteres especiales').required(),
    value: yup.number().positive().required(),
});

const updateMonaSchema = yup.object().shape({
    descr: yup.string().matches(expresiones.descrValidation, 'La descripcion no debe tener simbolos ni caracteres especiales').required(),
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
    createMonaSchema,
    updateMonaSchema,
};

