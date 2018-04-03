const axios = require('axios');
const https = require('https');

module.exports = {
  getJSON() {
    const url = 'https://httpbin.org/get';
    return axios
      .get(url)
      .then(response => response);
  },

  getJSON2() {
    return new Promise((resolve) => {
      const request = https.get('https://httpbin.org/get');
      request.on('response', resolve);
    })
      .then(msg => new Promise((resolve) => {
        let rawData = '';
        msg.on('data', (chunk) => { rawData += chunk; });
        msg.on('end', () => {
          resolve(rawData);
        });
      }))
      .then((json) => {
        JSON.parse(json);
        return json;
      });
  },
};
