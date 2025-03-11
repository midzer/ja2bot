import { readFileSync } from "fs"
import axios from "axios";

import configFile from "./config.json" with {type: 'json'};

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const file = readFileSync('ja2.txt', 'utf8');
const quotes = file.split("\n");

await new Promise((resolve, reject) => {
    const quote = randomFrom(quotes);
    const status_message = `${quote}`;
    console.log(`Trying to toot "${status_message}"`);
    const config = {
        method: 'post',
        url: `${configFile.api_url}/statuses`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${configFile.access_token}`
        },
        data: JSON.stringify({status: status_message, language: 'en'})
    };

    axios(config)
        .then(function (res) {
            console.log(JSON.stringify(res.data));
            resolve(res.statusCode);
        })
        .catch(function (error) {
            console.log(error);
            reject(Error(error));
        });
});
