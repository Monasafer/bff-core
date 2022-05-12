const pool = require('../../database');

var reservesService = {

    getReserves: function(user_id) {
        let query;
        let rows = [user_id];
        query = 'SELECT * FROM reserves WHERE (user_id) = ? AND (state)=1';
        return pool.query(query, rows);
    },

    getReserveByMonth: function(user_id, month) {
        let query;
        let rows = [user_id, month];
        query = 'SELECT * FROM reserves WHERE (user_id) = ? AND (month) = ? AND (state)=1 ';
        return pool.query(query, rows);
    },

    setReserve: function(user_id, name, value, available, month, id_fixed_reserve) {
        const query = `insert into reserves(user_id,name,value,month,state,id_fixed_reserve) values(?,?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, available, month, state, id_fixed_reserve]
        return pool.query(query, rows);
    },

    setMultipleReserves: function(additional) {
        const query = `insert into reserves(user_id,name,value,month,state,id_fixed_reserve) values ${additional}`;
        rows = [];
        return pool.query(query, rows);
    },
    
    updateReserve: function(id, user_id, name, value) {
        let query = `UPDATE reserves
                SET 
                name = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    updateMultipleReserve: function(id_fixed_reserve, user_id, name, value, month, valueChanges) {
        if (valueChanges == 0) {
            rows = [name, id_fixed_reserve, user_id];
            let query = `UPDATE reserves
                    SET 
                    name = ?
                    WHERE id_fixed_reserve = ?
                    AND user_id = ?`;
            return pool.query(query, rows);
        } else if (valueChanges == 1) {
            rows = [value, id_fixed_reserve, user_id, month];
            let query = `UPDATE reserves
                SET 
                value = ?
                WHERE id_fixed_reserve = ?
                AND user_id = ?
                AND month >= ?`;
            return pool.query(query, rows);
        }
    },

    deleteReserve: function(id, user_id) {
        let query = `UPDATE reserves
                SET 
                state = ?
                WHERE id = ?
                AND user_id = ?`;
        state = 0;
        rows = [state, id, user_id];
        return pool.query(query, rows);
    },

    deleteMultipleReserve: function(id_fixed_reserve, user_id, month) {
        let query = `UPDATE reserves
                SET 
                state = ?
                WHERE id_fixed_reserve = ?
                AND user_id = ?
                AND month >= ?`;
        state = 0;
        rows = [state, id_fixed_reserve, user_id, month];
        return pool.query(query, rows);
    }
}

module.exports = reservesService;