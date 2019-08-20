const fs = require('fs');
const {assert} = require('chai');
const netflixParser = require('./netflixParser');

describe('# Netflix Parser테스트', () => {
  const response = fs.readFileSync('netflixReceipt.json');
  it('fromEmail가져오기', () => {
    assert.strictEqual(netflixParser.getFromEmail(response), 'info@mailer.netflix.com');
  });
  it('멤버십 가져오기', () => {
    assert.strictEqual(netflixParser.getNetflixInfo.plan, '프리미엄');
  });
})
