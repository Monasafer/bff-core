const pool = require('../../database');

var reserveExpendService = {

    getReserveExpendByFatherReserveId: function(user_id, reserve_id) {
        let query;
        let rows = [user_id, reserve_id];
        query = 'SELECT * FROM reserves_expends WHERE (user_id) = ? AND (reserve_id) = ? AND (state)=1';
        return pool.query(query, rows);
    },

    setReserveExpend: function(user_id, name, value, reserve_id) {
        const query = `insert into reserves_expends(user_id,name,value,state,reserve_id) values(?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, state, reserve_id]
        return pool.query(query, rows);
    },

    setMultipleReserveExpends: function(additional) {
        const query = `insert into reserves_expends(user_id,name,value,state,reserve_id) values ${additional}`;
        rows = [];
        return pool.query(query, rows);
    },
    
    updateReserveExpend: function(id, user_id, name, value) {
        let query = `UPDATE reserves_expends
                SET 
                name = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    deleteReserveExpend: function(id, user_id) {
        let query = `UPDATE reserves_expends
                SET 
                state = ?
                WHERE id = ?
                AND user_id = ?`;
        state = 0;
        rows = [state, id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = reserveExpendService;