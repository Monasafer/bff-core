const express = require('express');
const userService = require('../services/userServices/userService')
const router = express.Router();
const validations = require('../services/userServices/validationsUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expresiones = require('../services/expressions');

router.get('/user', async(req, res, next) => {
    try {
        let user = req.headers['user'];
        let pass = req.headers['pass'];
        const response = await userService.getUser(user, pass);
        console.log("userService.getUser Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error);
    }

});

router.post('/user', validations.validate(validations.createUserSchema), async(req, res, next) => {
    try {
        let { user, pass, mail } = req.body;
        const salt = await bcrypt.genSalt(10);
        pass = bcrypt.hashSync(pass, salt);
        const response = await userService.setUser(user, pass, mail)
        console.log("userService.setUser Response : " + JSON.stringify(response));
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        user = req.headers['user'];
        pass = req.headers['pass'];
        const responseGet = await userService.loginUser(user);
        hashPassword = responseGet[0].pass;
        hashPassword.toString();
        let loginStatus = bcrypt.compareSync(pass, hashPassword);
        if (loginStatus) {
            const token = jwt.sign({
                    userId: responseGet[0].id
                },
                expresiones.secret, { expiresIn: '1w' }


            )
            res.status(200).send({ user: user, token: token });
        } else {
            res.status(400).send('Incorrect Password');
        }
    } catch (error) {
        next(error);
    }

});

router.put('/user', validations.validateupdate(validations.updateUserSchema), async(req, res, next) => {
    try {
        let user = req.headers['user'];
        let pass = req.headers['pass'];
        let response;
        let new_pass = req.headers['new_pass'];
        const salt = await bcrypt.genSalt(10);
        new_pass = bcrypt.hashSync(new_pass, salt);
        const responseGet = await userService.loginUser(user);
        hashPassword = responseGet[0].pass;
        hashPassword.toString();
        let VerifyIdentity = bcrypt.compareSync(pass, hashPassword);
        console.log(VerifyIdentity);
        if (VerifyIdentity) {
            response = await userService.updateUser(user, hashPassword, new_pass)
            console.log("userService.updateUser Response : " + JSON.stringify(response));
        } else {
            response = { error: 'wrong password' };
        }

        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.delete('/user', async(req, res, next) => {
    try {
        let user = req.headers['user'];
        let pass = req.headers['pass'];
        let response;
        const responseGet = await userService.loginUser(user);
        hashPassword = responseGet[0].pass;
        hashPassword.toString();
        let VerifyIdentity = bcrypt.compareSync(pass, hashPassword);
        if (VerifyIdentity) {
            response = await userService.deleteUser(user, hashPassword)
            console.log("userService.deleteUser Response : " + JSON.stringify(response));
        } else {
            response = { error: 'wrong password' };
        }
        res.json(response);
    } catch (error) {
        next(error);
    }

});

module.exports = router;