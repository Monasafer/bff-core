const pool = require('../../database');

var specialExpendService = {

    getSpecialExpend: function(user_id, month, id) {
        let query = '';
        let rows = [];
        if (id == 0) {
            query = `select * from special_expend WHERE user_id = ? AND month = ? AND state_code = 1`;
            rows = [user_id, month];
        } else {
            query = `select * from special_expend WHERE user_id = ? AND month = ? AND state_code = 1 AND id = ?`;
            rows = [user_id, month, id];
        }
        return pool.query(query, rows);
    },

    setSpecialExpend: function(user_id, name, capacity, stock, month, id_fixed_expend) {
        const query = `insert into special_expend(user_id, name,capacity, stock,month,state_code,id_fixed_expend) values(?,?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, capacity, stock, month, state, id_fixed_expend];
        return pool.query(query, rows);
    },

    updateMultipleSpecialExpend: function(id_fixed_expend, user_id, name, capacity, month, capacityChanges) {
        if (capacityChanges == 0) {
            rows = [name, id_fixed_expend, user_id];
            let query = `UPDATE special_expend
                    SET 
                    name = ?
                    WHERE id_fixed_expend = ?
                    AND user_id = ?`;
            return pool.query(query, rows);
        } else if (capacityChanges == 1) {
            rows = [capacity, id_fixed_expend, user_id, month];
            let query = `UPDATE special_expend
                SET 
                capacity = ?
                WHERE id_fixed_expend = ?
                AND user_id = ?
                AND month >= ?`;
            return pool.query(query, rows);
        }
    },

    updateStock: function(user_id, id, stock, month) {
        rows = [stock, id, user_id, month];
        let query = `UPDATE special_expend
                SET 
                stock = ?
                WHERE id = ?
                AND user_id = ?
                AND month = ?`;
        return pool.query(query, rows);
    },



    deleteMultipleSpecialExpend: function(id_fixed_expend, user_id, month) {
        let query = `UPDATE special_expend
                SET 
                state_code = ?
                WHERE id_fixed_expend = ?
                AND user_id = ?
                AND month >= ?`;
        state = 0;
        rows = [state, id_fixed_expend, user_id, month];
        return pool.query(query, rows);
    }
}

module.exports = specialExpendService;