var webdriver = require('selenium-webdriver'),
By = require('selenium-webdriver').By,
until = require('selenium-webdriver').until,
Key = require('selenium-webdriver').Key;
var fs = require('fs');
var zip = require('./zip.js');

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

exports.getList = function(driver, uname, url) {
   return new Promise(function(resolve, reject) {
     driver.get('https://www.facebook.com/messages/' + uname["name"]).then(function() {
         driver.findElements(By.css(a._59gp)).then(function(results) {
             for(var i=0; i<results.length; i++) {
               results[i].getAttribute('href').then(function(link) {
                 url.push(link);
               });
               if(url.length === results.length) {
                 if(url.length > 0 || (url.length == 0 && results.length == 0)) {
                   resolve("Success");
                 }
                 else {
                   reject(Error("Broke"));
                 }
               }
             }


         });
         console.log('Yep');
     });
   });
};

exports.fileUpload = function(driver, path, uname) {
    path = zip.mkZip(path);
    driver.get('https://www.facebook.com/messages/' + uname["name"]).then(function() {
      driver.findElement(By.className("_3jk")).then(function(input) {
          input.findElement(By.name("attachment[]")).then(function(attach) {
              attach.sendKeys(path).then(function() {
                  driver.findElement(By.className("_1rt")).then(function(message) {
                      message.findElement(By.name("message_body")).then(function(m) {
                          m.sendKeys(Key.RETURN).then(function() {
                              console.log("Yass!!");
                          });
                      });
                  });
              });
          });
      });
    });

}
