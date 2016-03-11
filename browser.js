var webdriver = require('selenium-webdriver'),
By = require('selenium-webdriver').By,
until = require('selenium-webdriver').until;
var fs = require('fs');

var exports = module.exports = {};

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

exports.driver = driver;
var uname = null;
exports.logIn = function(uid, pass) {

    webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
        return driver.takeScreenshot().then(function(data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                if(err) throw err;
            });
        })
    };

    driver.get('https://www.facebook.com');
    driver.saveScreenshot('snapshot1.png');
    driver.findElement(By.name('email')).sendKeys(uid);
    driver.findElement(By.name('pass')).sendKeys(pass);
    driver.saveScreenshot('snapshot2.png');
    driver.findElement(By.id('u_0_w')).click();
    driver.saveScreenshot('snapshot3.png');
    driver.get('https://www.facebook.com/404.html')
    driver.saveScreenshot('snapshot4.png');
    driver.findElement(By.className('_2s25')).getAttribute('href').then(function(ulink) {
      exports.uname = ulink.split('/').pop();
    });
};
