'use strict'

const ipcRenderer = require('electron').ipcRenderer;

function sendCred(form){
    var uid = form.uid.value;
    var pass = form.pass.value;
    form.uid.value = "";
    form.pass.value = "";
    ipcRenderer.send('credentials', uid, pass);
};

var holder = document.getElementById('holder');
holder.ondragover = function () {
  return false;
};
holder.ondragleave = holder.ondragend = function () {
  return false;
};
holder.ondrop = function (e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  console.log('File you dragged here is', file.path);
  ipcRenderer.send('fUpload', file.path);
  return false;
};
