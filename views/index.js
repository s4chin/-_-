'use strict'

const ipcRenderer = require('electron').ipcRenderer;

function sendCred(form){
    var uid = form.uid.value;
    var pass = form.pass.value;
    form.uid.value = "";
    form.pass.value = "";
    ipcRenderer.send('credentials', uid, pass);
};
