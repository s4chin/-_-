'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const ipcMain = require('electron').ipcMain;
var reload = require('require-reload')(require),
browser = reload('./browser.js');

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

  var uid, pass = null;
  ipcMain.on('credentials', function(event, id, pwd) {
    uid = id;
    pass = pwd;
    console.log(id + pass);
    browser.logIn(uid, pass);
    browser = reload(./browser.js);
    console.log(browser.uname);
  });


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
