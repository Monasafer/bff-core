const expressjwt = require('express-jwt');
const expresiones = require('../src/services/expressions');

function authJwt() {
    const secret = expresiones.secret;
    return expressjwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            '/login',
            '/user'
        ]
    })
}

module.exports = authJwt;