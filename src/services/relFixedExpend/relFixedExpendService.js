const { string } = require('yup');
const pool = require('../../database');

var relFixedExpendService = {

    getRelFixedExpend: function(user_id) {
        let active = 1;
        let state = 1;
        let rows = [user_id, active, state];
        let query = 'SELECT * FROM rel_fixed_expend WHERE (user_id) = ? AND (active) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    getActiveFixedExpendsBeforeMonth: function(user_id, month) {
        let rows = [month, user_id, month];
        let query = `select rel_fixed_expend.id, rel_fixed_expend.user_id, name, value, month from rel_fixed_expend
                     inner join expend 
                        on rel_fixed_expend.id = expend.id_fixed_expend
                        where month <= ?
                        and expend.state = 1
                        and active = 1 
                        and rel_fixed_expend.user_id = ?
                        and (expend.id_fixed_expend, month) IN 
                            (SELECT expend.id_fixed_expend, MAX(month)
                            FROM expend 
                            where month < ?
                            GROUP BY expend.id_fixed_expend
                            );`;
        return pool.query(query, rows);
    },

    setRelFixedExpend: function(user_id) {
        const query = `insert into rel_fixed_expend(user_id,creation_date,state,active) values(?,?,?,?)`;
        state = 1;
        active = 1;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [user_id, creation_date, state, active];
        return pool.query(query, rows);
    },

    updateRelFixedExpend: function(id_fixed_expend, user_id, active) {
        let query = `UPDATE rel_fixed_expend
                SET 
                active = ? 
                WHERE id_fixed_expend = ?
                AND user_id = ?`;
        rows = [active, id_fixed_expend, user_id];
        return pool.query(query, rows);
    },

    deleteRelFixedExpend: function(user_id, id_fixed_expend) {
        let query = `UPDATE rel_fixed_expend
            SET 
            state = ?,
            active = ?
            WHERE id = ?
            AND user_id = ?`;
        state = 0;
        active = 0;
        rows = [state, active, id_fixed_expend, user_id];
        return pool.query(query, rows);
    },

    deactivateRelFixedExpend: function(user_id, id_fixed_expend) {
        let query = `UPDATE rel_fixed_expend
            SET 
            state = ?,
            active = ?
            WHERE id = ?
            AND user_id = ?`;
        state = 1;
        active = 0;
        rows = [state, active, id_fixed_expend, user_id];
        return pool.query(query, rows);
    }
}

module.exports = relFixedExpendService;