const cheerio = require('cheerio');
const commonParser = require('../commonParser');

const getNetflixInfo = (response) => {
  require('fs').writeFile('netflixReceipt.html', commonParser.base64ToUtf8(response), 'utf8');
  const jsonObject = commonParser.stringToJsonObject(commonParser.base64ToUtf8(response));
  const dom = commonParser.convertHtml(commonParser.base64ToUtf8(jsonObject.payload.parts[1].body.data));
  console.log(dom);
  const $ = cheerio.load(dom);
  service = {};
  service.fromEmail = getFromEmail(response);
  service.email = commonParser.getEmailId(response);
  // service.name = $('span[class=title]').contents().get('0').data;
  // service.price = convertPrice($('body > table > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td.price-cell > span').text());
  // service.date = convertDateReg($('body > table:nth-child(4) > tbody > tr > td > div.aapl-desktop-div > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td').text())
  // service.renewal = convertRenewalReg($('span[class=renewal]').contents().get('0').data.trim());
  // service.periodMonth = calPeriod(service.renewal, service.date);
  return service;
}

const getFromEmail = (response) => {
  return fromEmailReg(commonParser.stringToJsonObject(commonParser.base64ToUtf8(response)).payload.headers[18].value);
}

const fromEmailReg = (fromEmail) => {
  console.log('delivered email : ', fromEmail);
  const emailReg = /<(.*?)>/;
  return emailReg.exec(fromEmail)[1];
};

module.exports = {
  getNetflixInfo: getNetflixInfo,
  getFromEmail: getFromEmail,
};
