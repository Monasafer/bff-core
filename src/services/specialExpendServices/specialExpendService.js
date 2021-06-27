const pool = require('../../database');

var specialExpendService = {
    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getSpecialExpend: function (user_id, startDate, endDate) {
        let rows = [user_id,endDate];
        let query = 'SELECT * FROM special_expend WHERE (user_id) = ? AND (state_code)=1 AND (finish_date>? OR finish_date IS NULL)';
        return pool.query(query, rows);
    },

    setSpecialExpend: function (user_id, descr, value, finish_date) {
        const query = `insert into special_expend(descr, value, user_id, creation_date,finish_date, state_code) values(?,?,?,?,?,1)`;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [descr, value, user_id, creation_date, finish_date]
        try {
            if(finish_date>creation_date || finish_date==null){
                return pool.query(query, rows);
            }
        } catch (error) {
            next(error);
        }
    },

    updateSpecialExpend: function (user_id, specialExpendId, descr, value, finish_date, payed) {
        let query = `UPDATE special_expend
                SET 
                descr = ?, 
                value = ?,
                finish_date = ?,
                WHERE id = ?
                AND user_id = ?`;
        rows = [descr, value, finish_date, specialExpendId, user_id];
        try {
            if(finish_date>creation_date || finish_date==null){
                return pool.query(query, rows);
            }
        } catch (error) {
            next(error);
        }
    },

    deleteSpecialExpend: function (user_id, specialExpendId) {
        let query = `UPDATE special_expend
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [specialExpendId, user_id];
        return pool.query(query, rows);
    }
}

module.exports = specialExpendService;