
const pool = require('../../database');

var monaService = {

    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getMona : function(user_id, month){
        let rows = [user_id, month];
        let query='SELECT * FROM mona WHERE (user_id) = ? AND (month) = ? AND (state_code)=1 ';
        return pool.query(query, rows);
    },

    setMona : function(user_id, name, value, month){
        const query = `insert into mona(name, value, user_id, creation_date, month, state_code) values(?,?,?,?, ?,1)`;
        const timeElapsed = Date.now();
        const creation_date = new Date(timeElapsed).toISOString();
        rows = [name, value, user_id, creation_date, month]
        return pool.query(query, rows);
    },

    updateMona : function(user_id, id, name, value){
        let query =  `UPDATE mona
                SET 
                name = ?, 
                value = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    deleteMona : function(user_id, id){
        let query =  `UPDATE mona
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = monaService; 