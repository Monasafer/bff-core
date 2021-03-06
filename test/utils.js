let url = 'http://localhost:3000/';
var request = require('request');

module.exports = {
    async getToken(callback) {
        var token;
        var options = {
            'method': 'POST',
            'url': url + 'login',
            'headers': {
                'user': 'pruebas',
                'pass': 'pruebas'
            },
        };

        await request(options, function(error, response) {
            if (error) throw new Error(error);
            let res = JSON.parse(response.body);
            token = res.token;
            callback(token)
        });
    }
}