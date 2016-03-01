// Set Node Enviroment Variables
require('dotenv').config();

// Self Checking
require('./self_check');

var child = require('child_process');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV;

switch(NODE_ENV) {
  case 'development':
    var nodemon = child.spawn(`nodemon`);
    nodemon.stdout.on('data', bufferHandler);
    nodemon.stderr.on('data', bufferHandler);
    break;
  case 'production':
    var pm2 = child.spawn('pm2', ['start', path.resolve(__dirname, `../${require('../package.json').main}`), '--name', 'Marketing', '--watch'])
    pm2.stdout.on('data', bufferHandler);
    pm2.stderr.on('data', bufferHandler);
    break;
  default:
    throw new Error('Please make sure the `NODE_ENV` in file `.env` is correct.')
}

function bufferHandler(buffer) {
  console.log(buffer.toString());
}