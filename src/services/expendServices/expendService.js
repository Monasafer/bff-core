const pool = require('../../database');

var expendService = {

    getExpend: function(user_id) {
        let query;
        let rows = [user_id];
        query = 'SELECT * FROM expend WHERE (user_id) = ? AND (state)=1';
        return pool.query(query, rows);
    },

    getExpendByMonth: function(user_id, month) {
        let query;
        let rows = [user_id, month];
        query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=1 ';
        return pool.query(query, rows);
    },

    getPayedDataExpend: function(user_id, id) {
        let state = 1;
        let query;
        let rows = [user_id, id, state];
        query = 'SELECT payed FROM expend WHERE (user_id) = ? AND (id) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    setExpend: function(user_id, name, value, month, id_fixed_expend) {
        const query = `insert into expend(user_id,name,value,month,state,id_fixed_expend) values(?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, month, state, id_fixed_expend]
        return pool.query(query, rows);
    },

    setMultipleExpends: function(additional) {
        const query = `insert into expend(user_id,name,value,month,state,id_fixed_expend) values ${additional}`;
        rows = [];
        return pool.query(query, rows);
    },
    
    updateExpend: function(id, user_id, name, value) {
        let query = `UPDATE expend
                SET 
                name = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    updatePayedExpend: function(id, user_id, isPayed) {
        let query = `UPDATE expend
                SET 
                payed = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [isPayed, id, user_id];
        return pool.query(query, rows);
    },

    updateMultipleExpend: function(id_fixed_expend, user_id, name, value, month, valueChanges) {
        if (valueChanges == 0) {
            rows = [name, id_fixed_expend, user_id];
            let query = `UPDATE expend
                    SET 
                    name = ?
                    WHERE id_fixed_expend = ?
                    AND user_id = ?`;
            return pool.query(query, rows);
        } else if (valueChanges == 1) {
            rows = [value, id_fixed_expend, user_id, month];
            let query = `UPDATE expend
                SET 
                value = ?
                WHERE id_fixed_expend = ?
                AND user_id = ?
                AND month >= ?`;
            return pool.query(query, rows);
        }
    },

    deleteExpend: function(id, user_id) {
        let query = `UPDATE expend
                SET 
                state = ?
                WHERE id = ?
                AND user_id = ?`;
        state = 0;
        rows = [state, id, user_id];
        return pool.query(query, rows);
    },

    deleteMultipleExpend: function(id_fixed_expend, user_id, month) {
        let query = `UPDATE expend
                SET 
                state = ?
                WHERE id_fixed_expend = ?
                AND user_id = ?
                AND month >= ?`;
        state = 0;
        rows = [state, id_fixed_expend, user_id, month];
        return pool.query(query, rows);
    }
}

module.exports = expendService;