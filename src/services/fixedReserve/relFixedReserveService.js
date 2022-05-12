const { string } = require('yup');
const pool = require('../../database');

var fixedReserveService = {

    getFixedReserve: function(user_id) {
        let active = 1;
        let state = 1;
        let rows = [user_id, active, state];
        let query = 'SELECT * FROM rel_fixed_reserves WHERE (user_id) = ? AND (active) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    //TODO : Modificar el nombre de esta funcion y analoga 
    getFixedReservesAndValues: function(user_id, month) {
        let active = 1;
        let state = 1;
        let rows = [month, state, active, user_id, month];
        let query = `select rel_fixed_reserves.id,rel_fixed_reserves.user_id,name,value,month from rel_fixed_reserves
                     inner join reserve 
                        on rel_fixed_reserves.id = reserve.id_fixed_reserve
                        where month <= ?
                        and reserve.state = ?
                        and active = ? 
                        and rel_fixed_reserves.user_id = ?
                        and (reserve.id_fixed_reserve,month) IN 
                            (SELECT reserve.id_fixed_reserve, MAX(month)
                            FROM reserve 
                            where month < ?
                            GROUP BY reserve.id_fixed_reserve
                            );`;
        return pool.query(query, rows);
    },

    setFixedReserve: function(user_id) {
        const query = `insert into rel_fixed_reserves(user_id,creation_date,state,active) values(?,?,?,?)`;
        state = 1;
        active = 1;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [user_id, creation_date, state, active];
        return pool.query(query, rows);
    },

    updateFixedReserve: function(id_fixed_reserve, user_id, active) {
        let query = `UPDATE rel_fixed_reserves
                SET 
                active = ? 
                WHERE id_fixed_reserve = ?
                AND user_id = ?`;
        rows = [active, id_fixed_reserve, user_id];
        return pool.query(query, rows);
    },

    deleteFixedReserve: function(user_id, id_fixed_reserve) {
        let query = `UPDATE rel_fixed_reserves
            SET 
            state = ?,
            active = ?
            WHERE id = ?
            AND user_id = ?`;
        state = 0;
        active = 0;
        rows = [state, active, id_fixed_reserve, user_id];
        return pool.query(query, rows);
    },

    deactivateFixedReserve: function(user_id, id_fixed_reserve) {
        let query = `UPDATE rel_fixed_reserves
            SET 
            state = ?,
            active = ?
            WHERE id = ?
            AND user_id = ?`;
        state = 1;
        active = 0;
        rows = [state, active, id_fixed_reserve, user_id];
        return pool.query(query, rows);
    }
}

module.exports = fixedReserveService;