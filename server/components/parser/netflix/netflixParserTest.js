const fs = require('fs');
const {assert} = require('chai');
const netflixParser = require('./netflixParser');
const commonParser = require('../commonParser');

describe('# Netflix Parser테스트', () => {
  const response = fs.readFileSync('netflixReceipt.json');
  it('fromEmail가져오기', () => {
    assert.strictEqual(netflixParser.getFromEmail(response), 'info@mailer.netflix.com');
  });
  it('netflix 가입여부', () => {
    assert.strictEqual(commonParser.checkDomain(response), 'netflix');
  });
})
