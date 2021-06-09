
const pool = require('../database');

var monaService = {

    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getMona : function(user_id, startDate, endDate){
        let rows = [user_id,startDate,endDate];
        let query='SELECT * FROM mona WHERE (user_id) = ? AND (state_code)=1 AND creation_date >=? AND creation_date <=?';
        return pool.query(query, rows);
    },

    setMona : function(user_id, descr, value){
        const query = `insert into mona(descr, value, user_id, creation_date, state_code) values(?,?,?,?,1)`;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();

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