const getServerStarter = require('./index');

getServerStarter()(8082, () => {
  console.log('listening on 8082');
});
