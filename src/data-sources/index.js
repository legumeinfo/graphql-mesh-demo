const { IntermineAPI } = require('./intermine/intermine.api.js');
//const { IntermineJsAPI } = require('./old/intermine-js.api.js');


const dataSources = () => {
  return {
    legumemineAPI: new IntermineAPI('https://mines.legumeinfo.org/legumemine/service'),
    //legumemineJsAPI: new IntermineJsAPI('https://mines.legumeinfo.org/legumemine'),
  };
};


module.exports = { dataSources };
