var AdmZip = require('adm-zip');

var exports = module.exports = {};

exports.mkZip = function(path) {
    var zip = new AdmZip();
    zip.addLocalFile(path);
    zip.writeZip(path + '.zip');
    return path + '.zip';
}
