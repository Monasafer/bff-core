const pool = require('../database');
const Validate = require('./validate')

var expendService = {
    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getExpend : function(user_id, startDate, endDate){
        let rows = [user_id,startDate,endDate];
        let query='SELECT * FROM expend WHERE (user_id) = ? AND (state_code)=1 AND creation_date >=? AND finish_date <=?';
        return pool.query(query, rows);
    },

    setExpend : function(user_id, descr, value,finish_date){
        if(Validate(descr)==true){
            const query = `insert into expend(descr, value, user_id, creation_date,finish_date, state_code) values(?,?,?,?,?,1)`;
            const timeElapsed = Date.now();
            const creation_date = new Date(timeElapsed).toISOString();
            rows = [descr, value, user_id, creation_date,finish_date]
            return pool.query(query, rows);
        } else{
            console.log("No deben ingresarse simbolos en la descripcion");
        }
    },

    updateExpend : function(user_id, expendId, descr, value,finish_date){
        if(Validate(descr)==true){
            let query =  `UPDATE expend
                SET 
                descr = ?, 
                value = ?,
                finish_date = ?
                WHERE id = ?
                AND user_id = ?`;
        rows = [descr, value,finish_date, expendId, user_id];
        return pool.query(query, rows);
        }else{console.log("No deben ingresarse simbolos en la descripcion");}
    },

    deleteExpend : function(user_id, expendId){
        let query =  `UPDATE expend
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [expendId, user_id];
        return pool.query(query, rows);
    }
}

module.exports = expendService; 