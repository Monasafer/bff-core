
const pool = require('../database');

var monaService = {

    getMona : function(user_id, startDate, endDate){
        let rows = [user_id,startDate,endDate];
        let query='SELECT * FROM mona WHERE (user_id) = ? AND (state_code)=1 AND creation_date >=? AND creation_date <=?';
        return pool.query(query, rows);
    },

    setMona : function(user_id, creation_date, descr, value){
        const query = `insert into mona(descr, value, user_id, creation_date, state_code) values(?,?,?,?,1)`;
        rows = [descr, value, user_id, creation_date]
        return pool.query(query, rows);
    },

    updateMona : function(user_id, monaId, descr, value){
        let query =  `UPDATE mona
                SET 
                descr = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [descr, value, monaId, user_id];
        return pool.query(query, rows);
    },

    deleteMona : function(user_id, monaId){
        let query =  `UPDATE mona
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [monaId, user_id];
        return pool.query(query, rows);
    }
}

module.exports = monaService; 