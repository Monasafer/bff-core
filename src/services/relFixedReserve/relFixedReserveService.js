const { string } = require('yup');
const pool = require('../../database');

var fixedReserveService = {

    getRelFixedReserve: function(user_id) {
        let active = 1;
        let state = 1;
        let rows = [user_id, active, state];
        let query = 'SELECT * FROM rel_fixed_reserves WHERE (user_id) = ? AND (active) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    //TODO : Modificar el nombre de esta funcion y analoga 
    getActiveFixedReservesBeforeMonth: function(user_id, month) {
        let active = 1;
        let state = 1;
        let rows = [month, state, active, user_id, month];
        let query = `select rel_fixed_reserves.id,rel_fixed_reserves.user_id,name,value,month from rel_fixed_reserves
                     inner join reserves 
                        on rel_fixed_reserves.id = reserves.id_fixed_reserve
                        where month <= ?
                        and reserves.state = ?
                        and active = ? 
                        and rel_fixed_reserves.user_id = ?
                        and (reserves.id_fixed_reserve,month) IN 
                            (SELECT reserves.id_fixed_reserve, MAX(month)
                            FROM reserves 
                            where month < ?
                            GROUP BY reserves.id_fixed_reserve
                            );`;
        return pool.query(query, rows);
    },

    setRelFixedReserve: function(user_id) {
        const query = `insert into rel_fixed_reserves(user_id,creation_date,state,active) values(?,?,?,?)`;
        state = 1;
        active = 1;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [user_id, creation_date, state, active];
        return pool.query(query, rows);
    },

    updateRelFixedReserve: function(id_fixed_reserve, user_id, active) {
        let query = `UPDATE rel_fixed_reserves
                SET 
                active = ? 
                WHERE id_fixed_reserve = ?
                AND user_id = ?`;
        rows = [active, id_fixed_reserve, user_id];
        return pool.query(query, rows);
    },

    deleteRelFixedReserve: function(user_id, id_fixed_reserve) {
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

    deactivateRelFixedReserve: function(user_id, id_fixed_reserve) {
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