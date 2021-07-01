const pool = require('../../database');

var expendService = {

    getExpend: function (user_id, month) {
        let rows = [user_id, month];
        let query = 'SELECT * FROM expend WHERE (user_id) = ? AND month > ? AND (state_code)=1 ';
        return pool.query(query, rows);
    },

    setExpend: function (user_id, name, value, month, payed, recurrent) {
        const query = `insert into expend(name, value, user_id, creation_date, month, payed, recurrent, state_code) values(?,?,?,?,?,?,?,1)`;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [name, value, user_id, creation_date, month, payed, recurrent]
        console.log("Llega hasta aca?");
        try {
            return pool.query(query, rows);
        } catch (error) {
            next(error);
        }
    },

    updateExpend: function (user_id, expendId, name, value, recurrent, payed) {
        let query = `UPDATE expend
                SET 
                name = ?, 
                value = ?,
                recurrent = ?,
                payed = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, finish_date, payed, recurrent, expendId, user_id];
        try {
            if(finish_date>creation_date || finish_date==null){
                return pool.query(query, rows);
            }
        } catch (error) {
            next(error);
        }
    },

    deleteExpend: function (user_id, expendId) {
        let query = `UPDATE expend
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [expendId, user_id];
        return pool.query(query, rows);
    }
}

module.exports = expendService;