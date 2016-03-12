var webdriver = require('selenium-webdriver'),
By = require('selenium-webdriver').By,
until = require('selenium-webdriver').until;
var fs = require('fs');
var sleep = require('sleep')

var exports = module.exports = {};

exports.logIn = function(driver, uid, pass, uname) {
    return new Promise(function(resolve, reject) {
        webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
            return driver.takeScreenshot().then(function(data) {
                fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                    if(err) throw err;
                });
            })
        };
      driver.get('https://www.facebook.com').then(function() {
        driver.saveScreenshot('snapshot1.png');
        driver.findElement(By.name('email')).sendKeys(uid)
          driver.findElement(By.name('pass')).sendKeys(pass).then(function() {
            driver.findElement(By.id('u_0_w')).click().then(function() {
              driver.saveScreenshot('snapshot3.png');
              driver.get('https://www.facebook.com/404.html').then(function() {
                driver.saveScreenshot('snapshot4.png');
                  driver.findElement(By.className('_2s25')).getAttribute('href').then(function(ulink) {
                    uname["name"] = ulink.split('/').pop();
                    if(uname["name"] != "undefined") {
                      resolve("Stuff worked!");
                    }
                    else {
                      reject(Error("It broke!"));
                    }
                  });
            });
          });
        });
      });
    });

};
