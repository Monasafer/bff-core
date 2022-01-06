let url = 'http://localhost:3000/';
var request = require('request');

async function getToken (callback) {
    var options = {
        'method': 'POST',
        'url': url + 'login',
        'headers': {
            'user': 'federico',
            'pass': 'sk84life'
        },
    };

    await request(options, await function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        token = res.token;
        console.log("token: " + token)
        callback(token)
    });
}
    
describe('#getTokenWithCallback', () => {
    it('resolves with token', () => {
        getToken(function(res) { console.log("login result with callback: " + res) })
    })
})