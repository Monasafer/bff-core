const pool = require('../../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expresiones = require('../../services/expressions');
var userService = {
    getUser: function(user, pass) {
        let rows = [user, pass];
        let query = 'SELECT * FROM user WHERE (user) = ? AND pass = ? AND state_code =1';
        return pool.query(query, rows);
    },

    getUserUpdate: function(user) {
        let rows = [user];
        let query = 'SELECT * FROM user WHERE (user) = ? AND state_code =1';
        return pool.query(query, rows);
    },

    loginUser: async function(user, pass) {
        console.log("user y pass")
        console.log("user" + user + " pass" + pass)
        let query = 'Select user,pass,id FROM user WHERE (user)=?';
        responseGet = await pool.query(query, user);
        hashPassword = responseGet[0].pass;
        hashPassword.toString();
        console.log("comparacion pass y hashpassword")
        console.log(pass)
        console.log(hashPassword)
        let loginStatus = bcrypt.compareSync(pass, hashPassword);
        var loginData;
        console.log("login status")
        console.log(loginStatus)
        if (loginStatus) {
            const token = jwt.sign({
                    userId: responseGet[0].id
                },
                expresiones.secret, { expiresIn: '1w' }
            )
            loginData = { user: user, token: token };
        } else {
            loginData = null
        }
        return loginData;
    },

    setUser: function(user, pass, mail) {
        const query = `insert into user(user, pass, mail, creation_date, state_code) values(?,?,?,?,1)`;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [user, pass, mail, creation_date]
        return pool.query(query, rows);
    },

    updateUser: function(user, pass, new_pass) {
        let query = `UPDATE user
                SET 
                pass = ?
                WHERE user = ? AND pass = ?`;
        rows = [new_pass, user, pass];
        return pool.query(query, rows);
    },

    deleteUser: function(user, pass) {
        let query = `UPDATE user
        SET 
        state_code = 0
        WHERE user = ?
        AND pass = ?`;
        rows = [user, pass];
        return pool.query(query, rows);
    }
}

module.exports = userService;