const pool = require('../../database');
var userService = {
    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getUser: function (user, pass) {
        let rows = [user, pass];
        let query = 'SELECT * FROM user WHERE (user) = ? AND pass = ? AND state_code =1';
        return pool.query(query, rows);
    },

    setUser: function (user, pass, mail) {
                const query = `insert into user(user, pass, mail, creation_date, state_code) values(?,?,?,?,1)`;
                const timeElapsed = Date.now();
                const creation_date = new Date(timeElapsed).toISOString();
                rows = [user, pass, mail, creation_date]
                return pool.query(query, rows);
    },

    updateUser: function (user, pass, new_pass) {
        let query = `UPDATE user
                SET 
                pass = ?
                WHERE user = ? AND pass = ?`;
        rows = [new_pass, user, pass];
        return pool.query(query, rows);
    },

    deleteUser: function (user, pass) {
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