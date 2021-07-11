const pool = require('../../database');

var saveService = {
    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getSave: function (user_id, month) {
        let rows = [user_id, month];
        let query = 'SELECT * FROM save WHERE (user_id) = ? AND (month)=? AND (state_code)=1 ';
        return pool.query(query, rows);
    },

    setSave: function (user_id, name, value, month) {
        const query = `insert into save(name, value, user_id, month,creation_date, state_code) values(?,?,?,?,?,1)`;
        const creation_date = new Date(Date.now()).toISOString();
        rows = [name, value, user_id, month, creation_date]
        return pool.query(query, rows);
    },

    updateSave: function (id, user_id, name, value) {
        let query = `UPDATE save
                SET 
                name = ?, 
                value = ?
                WHERE id = ? 
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    deleteSave: function (user_id, id) {
        let query = `UPDATE save
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = saveService;