const expresiones = require('../expressions')
const yup = require('yup');

const BffCreateExpend = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, 'Name should not have symbols').required(),
    value: yup.number().positive().required(),
    month: yup.date().required(),
    fixed: yup.number()
});

const BffUpdateExpend = yup.object().shape({
    name: yup.string().matches(expresiones.nameValidation, 'Name should not have symbols').required(),
    value: yup.number().positive().required()
});

const BffCreateMonth = yup.object().shape({
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
    BffCreateExpend,
    BffUpdateExpend,
    BffCreateMonth
};

