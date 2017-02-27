'use strict';
const wreck = require('wreck');

exports.defaults = {
  endpoint: undefined
};

exports.log = function(options, tags, message) {
  const settings = Object.assign({}, exports.defaults, options);
  if (typeof settings.endpoint !== 'string') {
    throw new Error('you must specify an endpoint URL to use logr-hook')
  }
  wreck.post(settings.endpoint, { payload: { tags, message } }, (err, response, payload) => {
    if (err) {
      throw err;
    }
  });
};
