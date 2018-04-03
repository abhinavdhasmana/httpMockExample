const Lab = require('lab');
const Sinon = require('sinon');
const { expect } = require('chai');
const requestHelper = require('../../helpers/requestHelper');
const axios = require('axios');
const nock = require('nock');

const lab = exports.lab = Lab.script(); // eslint-disable-line

lab.experiment('Fake http call with axios', () => {
  lab.before((done) => {
    Sinon
      .stub(axios, 'get')
      .resolves({ data: { url: 'testUrl' } });
    done();
  });
  lab.test('should return the fake data', (done) => {
    const result = requestHelper.getJSON();
    result.then((response) => {
      expect(response.data.url).to.eqls('testUrl');
      axios.get.restore();
      done();
    });
  });
});

lab.experiment('Fake http call with nock', () => {
  lab.test('should return the fake data', (done) => {
    nock('https://httpbin.org')
      .get('/get')
      .reply(200, {
        origin: '1.1.1.1',
        url: 'http://testUrl',
      });
    const result = requestHelper.getJSON2();
    result.then((response) => {
      const parsedResponse = JSON.parse(response);
      expect(parsedResponse.url).to.eqls('http://testUrl');
      nock.cleanAll();
      done();
    });
  });
});
