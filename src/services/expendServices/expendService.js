const pool = require('../../database');

var expendService = {

    getExpend: function (user_id, month) {
        let state = 1;
        let rows = [user_id, month, state];
        let query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    setExpend: function (user_id, name, value, month, id_fe) {
        const query = `insert into expend(user_id,name,value,month,state,id_fe) values(?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, month, state, id_fe]
        return pool.query(query, rows);
    },

    updateExpend: function (id, user_id, name, value) {
        let query = `UPDATE expend
                SET 
                name = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    deleteExpend: function (id, user_id) {
        let query = `UPDATE expend
                SET 
                state = ?
                WHERE id = ?
                AND user_id = ?`;
        state = 0;
        rows = [state, id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = expendService;