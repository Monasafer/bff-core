const pool = require('../../database');

var saveService = {

    createSave: function (name, user_id, tag) {
        const query = `insert into save(name, user_id, creation_date, tag, state) values(?,?,?,?,1)`
        const creation_date = new Date(Date.now()).toISOString();
        rows = [name, user_id, creation_date, tag]
        return pool.query(query, rows);
    },

    createSaveHistory: function (value, save_id) {
        const query = `INSERT INTO save_history (value, state, save_id, creation_date) VALUES(?, 1, ?, ?)`
        const creation_date = new Date(Date.now()).toISOString();
        rows = [value, save_id, creation_date]
        return pool.query(query, rows);
    },
    
    getSaveWithLastValueById: function (save_id, user_id) { //used internally to update a save
        let rows = [user_id, save_id];
        let query = `select save.id, save.name, sh.value, save.tag, sh.creation_date 
        from save 
        inner join save_history sh 
            on save.id = sh.save_id 
        where user_id = ? 
        and save.id = ? 
        order by sh.creation_date desc limit 1`
        ;
        return pool.query(query, rows);
    },

    getSavesWithLastValueByUserId: function (user_id) { //used Save main screen 
        let rows = [user_id];
        let query = `select * from (select save.id, save.name, sh.value, save.tag, sh.creation_date 
            from save 
            inner join save_history sh 
                on save.id = sh.save_id 
            where user_id = ? 
            order by sh.creation_date desc) all_saves_with_values_ordered
            group by all_saves_with_values_ordered.id`
        ;
        return pool.query(query, rows);
    },

    getSavesHistoryByUserId: function (user_id) { //used in Save history screen
        let rows = [user_id];
        let query = `select save.id, save.name, sh.value, save.tag, sh.creation_date 
        from save 
        inner join save_history sh 
            on save.id = sh.save_id 
        where user_id = ? 
        order by save.id`
        ;
        return pool.query(query, rows);
    },


    updateSave: function (id, user_id, name, value) {
        let query = `UPDATE save
                SET 
                name = ?, 
                value = ?
                WHERE id = ? 
                AND user_id = ?`;
        rows = [name, value, id, user_id];
        return pool.query(query, rows);
    },

    deleteSave: function (user_id, id) {
        let query = `UPDATE save
        SET 
        state_code = 0
        WHERE id = ?
        AND user_id = ?`;
        rows = [id, user_id];
        return pool.query(query, rows);
    }
}

module.exports = saveService;