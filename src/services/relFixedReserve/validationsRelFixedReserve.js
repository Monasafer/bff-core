const expresiones = require('../expressions')
const yup = require('yup');

const createFixedReserveSchema = yup.object().shape({
    user_id: yup.number().required()
});

const updateFixedReserveSchema = yup.object().shape({
    user_id: yup.number().required()
});

const validate = (schema) => async (req,res,next)=>{
    const header = req.headers;
    try{
        await schema.validate(header);
        next();
    }catch(error){
        next(error);
    }
}

module.exports = {
    validate,
    createFixedReserveSchema,
    updateFixedReserveSchema
};

