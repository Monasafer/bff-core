const expresiones = require('../expressions')
const yup = require('yup');

const createMonthSchema = yup.object().shape({
    month: yup.date().required()
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
    createMonthSchema
};

