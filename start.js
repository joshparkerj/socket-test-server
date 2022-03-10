const serverDebug = require('debug')('server');

const getServerStarter = require('./index');

getServerStarter()(8082, () => {
  serverDebug('listening on 8082');
});
