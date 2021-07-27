const pool = require('../../database');

var monthService = {

    getMonth: function (user_id, month) {
        let rows = [user_id, month];
        let query = 'SELECT * FROM month WHERE (user_id) = ? AND (month) = ? AND (state)=1 ';
        return pool.query(query, rows);
    },

    setMonth: function (user_id, month) {
        console.log(month);
        const query = `insert into month (user_id,month,state) values(?,?,1)`;
        rows = [user_id, month]
        return pool.query(query, rows);
    },

    deleteMonth: function (user_id, id) {
        let query = `UPDATE month
        SET 
        state = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = monthService;