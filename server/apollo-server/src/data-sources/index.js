const { IntermineAPI } = require('./intermine/intermine.api.js');


const dataSources = () => {
  return {
    legumemineAPI: new IntermineAPI('https://mines.legumeinfo.org/legumemine/service'),
  };
};


module.exports = { dataSources };
