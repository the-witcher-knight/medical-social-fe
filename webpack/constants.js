const { resolve } = require('path');

exports.SRC = resolve(__dirname, '../src');
exports.PUBLIC = resolve(__dirname, '../public');
exports.DIST = resolve(__dirname, '../build');
exports.FAVICON = resolve(__dirname, '../public', 'favicon.ico');
exports.MANIFEST = resolve(__dirname, '../public', 'manifest.json');
exports.LOGO192 = resolve(__dirname, '../public', 'logo192.png');
exports.LOGO512 = resolve(__dirname, '../public', 'logo512.png');
