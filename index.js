'use strict';
const wreck = require('wreck');

exports.defaults = {
  endpoint: 'http://localhost:8080/'
};

exports.log = function(options, tags, message) {
  const settings = Object.assign({}, exports.defaults, options);
  wreck.post(settings.endpoint, { payload: { tags, message } }, (err, response, payload) => {
    if (err) {
      throw err;
    }
  });
};
