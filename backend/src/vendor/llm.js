const request = require('request');

function prompt() {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'post',
            url: 'http://127.0.0.1:5000/home',
            body: '{"content":"teste"}',
            headers:{
                "Content-Type":"application/json"
            }
        };

        request(options, function (error, response, body) {
            if (error) reject(error)
            resolve(body)
        });
    })
}

module.exports = {
    prompt
};