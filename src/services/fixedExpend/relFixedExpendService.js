const { string } = require('yup');
const pool = require('../../database');

var fixedExpendService = {

    getFixedExpend: function (user_id) {
        let active = 1;
        let state = 1;
        let rows = [user_id, active, state];
        let query = 'SELECT * FROM rel_fixed_expend WHERE (user_id) = ? AND (active) = ? AND (state)=? ';
        return pool.query(query, rows);
    },

    getFixedExpendsAndValues: function (user_id, month) {
        let active = 1;
        let state = 1;
        let rows = [month, state, active, user_id, month];
        let query = `select rel_fixed_expend.id_fe,rel_fixed_expend.user_id,name,value,month from rel_fixed_expend
                     inner join expend 
                        on rel_fixed_expend.id_fe = expend.id_fe
                        where month <= ?
                        and expend.state = ?
                        and active = ? 
                        and rel_fixed_expend.user_id = ?
                        and (expend.id_fe,month) IN 
                            (SELECT expend.id_fe, MAX(month)
                            FROM expend 
                            where month < ?
                            GROUP BY expend.id_fe
                            );`;
        return pool.query(query, rows);
    },

    setFixedExpend: function (user_id) {
        const query = `insert into rel_fixed_expend(user_id,creation_date,state,active) values(?,?,?,?)`;
        state = 1;
        active = 1;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [user_id, creation_date, state, active];
        return pool.query(query, rows);
    },

    updateFixedExpend: function (id_fe, user_id, active) {
        let query = `UPDATE rel_fixed_expend
                SET 
                active = ? 
                WHERE id_fe = ?
                AND user_id = ?`;
        rows = [active, id_fe, user_id];
        return pool.query(query, rows);
    },

    deleteFixedExpend: function (user_id, id_fe) {
        let query = `UPDATE rel_fixed_expend
            SET 
            state = ?,
            active = ?
            WHERE id_fe = ?
            AND user_id = ?`;
        state = 1;
        active = 0;
        rows = [state, active, id_fe, user_id];
        return pool.query(query, rows);
    }
}

module.exports = fixedExpendService;