const pool = require('../../database');

var bffExpendService = {

    getBffExpend: function (user_id, id) {
        let state = 1;
        let rows = [user_id, id, state];
        let query = 'SELECT * FROM expend WHERE (user_id) = ? AND (id) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    updateBffExpend: function (id_fe,user_id,name,value) {
        let query = `UPDATE expend
                SET 
                name = ?, 
                value = ?
                WHERE id_fe = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },



    deleteBffExpend: function (id, user_id) {
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

module.exports = bffExpendService;