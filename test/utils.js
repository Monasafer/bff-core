let url = 'http://localhost:3000/';
var request = require('request');

const getToken = async () => {
    var token;
    var options = {
      'method': 'POST',
      'url': url + 'login',
      'headers': {
          'user': 'federico',
          'pass': 'sk84life'
      },
    };
  
    await request(options, function(error, response) {
        if (error) throw new Error(error);
        let res = JSON.parse(response.body);
        token = res.response.token;
        console.log('TOKEN IS : ' + token)
    });
    console.log('TOKEN IS : ' + token)
    return token
  }
  
exports.getToken = getToken;