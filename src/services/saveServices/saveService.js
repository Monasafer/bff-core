const pool = require('../../database');

var saveService = {
    //TODO : Sanitización de todos los datos. Si es string, no puede tener simbolos <>=?;: , dado que permitiria un query injection.

    getSave : function(user_id, startDate, endDate){
        let rows = [user_id,startDate,endDate];
        let query='SELECT * FROM save WHERE (user_id) = ? AND (state_code)=1 AND creation_date >=? AND creation_date <=?';
        return pool.query(query, rows);
    },

    setSave : function(user_id, name, value){
        if(Validate(name)==true){
            const query = `insert into save(name, value, user_id, creation_date, state_code) values(?,?,?,?,1)`;
            const timeElapsed = Date.now();
            const creation_date = new Date(timeElapsed).toISOString();
            rows = [name, value, user_id, creation_date]
            return pool.query(query, rows);
        } else{
            console.log("No deben ingresarse simbolos en la nameripcion");
        }
    },

    updateSave : function(user_id, saveId, name, value){
        if(Validate(name)==true){
            let query =  `UPDATE save
                SET 
                name = ?, 
                value = ?
                WHERE id = ? 
                AND user_id = ?`;
        rows = [name, value, saveId, user_id];
        return pool.query(query, rows);
        }else{console.log("No deben ingresarse simbolos en la nameripcion");}
    },

    deleteSave : function(user_id, saveId){
        let query =  `UPDATE save
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [saveId, user_id];
        return pool.query(query, rows);
    }
}

module.exports = saveService; 