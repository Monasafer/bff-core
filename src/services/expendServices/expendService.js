const pool = require('../../database');

var expendService = {

    getExpend: function(user_id, month, id, fixed, dailyUse) {
        let state = 1;
        let query;
        let getFixed;
        let rows = [user_id, month, state];
        if (fixed == null && dailyUse == null && id == null) {
            query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=? ';
        } else {
            if (fixed == 1 && id == null) {
                getFixed = "AND id_fe != 'null'";
                getDaily = "AND dailyUse = ?"
                query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=? ' + getFixed + getDaily;
                rows = [user_id, month, state, dailyUse];
            } else if (fixed == 0 && id == null) {
                getFixed = "AND id_fe is null";
                query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=? ' + getFixed;
            }
            if (id != null) {
                getId = " AND id = ?";
                rows = [user_id, month, state, id];
                query = 'SELECT * FROM expend WHERE (user_id) = ? AND (month) = ? AND (state)=? ' + getId;
            }
        }
        return pool.query(query, rows);
    },

    setExpend: function(user_id, name, value, month, id_fe, dailyUse) {
        const query = `insert into expend(user_id,name,value,month,state,id_fe,dailyUse) values(?,?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, month, state, id_fe, dailyUse]
        return pool.query(query, rows);
    },

    setMultipleExpends: function(additional) {
        const query = `insert into expend(user_id,name,value,month,state,id_fe,dailyUse) values ${additional}`;
        rows = [];
        return pool.query(query, rows);
    },

    setMultipleSpecialExpends: function(additional) {
        const query = `insert into special_expend(user_id,name,capacity,stock,month,state_code,id_fe) values ${additional}`;
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

    updateMultipleExpend: function(id_fe, user_id, name, value, month, valueChanges) {
        if (valueChanges == 0) {
            rows = [name, id_fe, user_id];
            let query = `UPDATE expend
                    SET 
                    name = ?
                    WHERE id_fe = ?
                    AND user_id = ?`;
            return pool.query(query, rows);
        } else if (valueChanges == 1) {
            rows = [value, id_fe, user_id, month];
            let query = `UPDATE expend
                SET 
                value = ?
                WHERE id_fe = ?
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

    deleteMultipleExpend: function(id_fe, user_id, month) {
        let query = `UPDATE expend
                SET 
                state = ?
                WHERE id_fe = ?
                AND user_id = ?
                AND month >= ?`;
        state = 0;
        rows = [state, id_fe, user_id, month];
        return pool.query(query, rows);
    }
}

module.exports = expendService;