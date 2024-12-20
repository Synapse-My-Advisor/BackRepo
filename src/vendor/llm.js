const request = require('request');

function prompt() {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'post',
            url: 'https://llm-mateus-robers-projects.vercel.app/home',
            body: '{"content":"resuma o conteudo","tg_id":1, "user_id":"mateus"}',
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

module.exports = prompt;
