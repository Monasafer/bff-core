const pool = require('../../database');

var reservesService = {

    getReserves: function(user_id) {
        let query;
        let rows = [user_id];
        query = 'SELECT * FROM reserves WHERE (user_id) = ? AND (state)=1';
        return pool.query(query, rows);
    },

    getReserveById: function(user_id, id) {
        console.log("query to user id , id", user_id, id)
        let query;
        let rows = [user_id, id];
        query = 'SELECT * FROM reserves WHERE (user_id) = ? AND (state)=1  AND (id)=?';
        return pool.query(query, rows);
    },

    getReservesByMonth: function(user_id, month) {
        let query;
        let rows = [user_id, month];
        query = 'SELECT * FROM reserves WHERE (user_id) = ? AND (month) = ? AND (state)=1 ';
        return pool.query(query, rows);
    },

    getReservesAndItemsByMonth: function(user_id, month) {
        let query;
        let rows = [month, user_id];
        query = `select reserves.id as reserve_id, reserves.name as reserve_name, reserves.value as reserve_value, id_fixed_reserve, tag, re.id as item_id, re.name as item_name, re.value as item_value 
                FROM reserves 
                    left join reserves_expends re
                    on reserves.id = re.reserve_id and re.state = 1
                WHERE reserves.month = ?
                and reserves.user_id = ?
                and reserves.state = 1
                order by reserve_id`;
        return pool.query(query, rows);
    },

    setReserve: function(user_id, name, value, month, id_fixed_reserve) {
        const query = `insert into reserves(user_id,name,value,month,state,id_fixed_reserve) values(?,?,?,?,?,?)`;
        state = 1;
        rows = [user_id, name, value, month, state, id_fixed_reserve]
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

    updateMultipleReserve: function(id_fixed_reserve, user_id, name, value, month, modifyOnlySubsequentMonths) {
        if (modifyOnlySubsequentMonths == 0) {
            rows = [name, id_fixed_reserve, user_id];
            let query = `UPDATE reserves
                    SET 
                    name = ?
                    WHERE id_fixed_reserve = ?
                    AND user_id = ?`;
            return pool.query(query, rows);
        } else if (modifyOnlySubsequentMonths == 1) {
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