const expresiones = require('../expressions')
const yup = require('yup');

const createUserSchema = yup.object().shape({
    user: yup.string().min(6, 'Minimo deben ser 6 caracteres').matches(expresiones.userValidation, 'El usuario no debe tener simbolos ni caracteres especiales').required(),
    pass: yup.string().min(10,'Minimo contraseña de 6 caracteres').matches(expresiones.passValidation).required(),
    mail: yup.string().matches(expresiones.mailValidation).required()
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

const validateupdate = (schema) => async (req,res,next)=>{
    let pass = req.headers['pass'];
    let new_pass = req.headers['new_pass'];
    let body = {pass,new_pass} 
    try{
        await schema.validate(body);
        next();
    }catch(error){
        next(error);
    }
}

const updateUserSchema = yup.object().shape({
    pass: yup.string().min(10,'Minimo contraseña de 6 caracteres').matches(expresiones.passValidation).required(),
    new_pass: yup.string().min(10,'Minimo contraseña de 6 caracteres').matches(expresiones.passValidation).required(),
});

module.exports = {
    validate,
    createUserSchema,
    validateupdate,
    updateUserSchema,
};











//async function createUserValidationTEST(data) {
//        const schema = yup.object().shape({
//            user: yup.string().min(6, 'Minimo deben ser 6 caracteres').matches(expresiones.userValidation, 'El usuario no debe tener simbolos ni caracteres especiales').required(),
//            pass: yup.string().min(10).matches(expresiones.passValidation).required(),
//            mail: yup.string().matches(expresiones.mailValidation).required()
//        });
//        await schema.validate(data,{abortEarly: false});
//}

//function validate(validation) {
//    return (req, res, next) => {
//        try {
//            validation(req.body);
//
//            next();
//        } catch (error) {
//            next(error);
//        }
//    };
//}

//function createUserValidation(data) {
//    const { user, pass, mail } = data;
//    if (expresiones.userValidation.test(user) !== true) {
//        throw new Error('Nombre de usuario no valido');
//    }
//    if (expresiones.mailValidation.test(mail) !== true) {
//        throw new Error('Mail no valido');
//   }
//   if (expresiones.passValidation.test(pass) !== true) {
//       throw new Error('Contraseña no valida');
//    }
//}
