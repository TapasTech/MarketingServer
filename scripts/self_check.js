var child = require('child_process');
var globalDependencies = require('../package.json').globalDependencies[process.env.NODE_ENV];
var uninstallDependencies = globalDependencies.filter(dependence => child.spawnSync('which', [dependence]).status !== 0);

if (uninstallDependencies.length !== 0) {
  throw new Error(`${uninstallDependencies.join(' ')} must be installed before the app start`);
};