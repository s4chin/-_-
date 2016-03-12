'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipcMain = require('electron').ipcMain;
const browser = require('./browser.js');
var sleep = require('sleep');
var webdriver = require('selenium-webdriver');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL('file://' + __dirname + '/views/main.html');
  mainWindow.webContents.openDevTools();

  var driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  var uid, pass, uname = null;
  ipcMain.on('credentials', function(event, id, pwd) {
    uid = id;
    pass = pwd;
    uname = {name:"undefined"};
    console.log(id + pass);
    browser.logIn(driver, uid, pass, uname).then(function(result) {
      console.log(uname["name"]);
    }, function(err) {
      console.log("It broke!");
    });
  });

  ipcMain.on('fUpload', function(event, path) {
    console.log(path);
    browser.fileUpload(driver, path).then(function(result) {

    }, function(err) {

    });
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
