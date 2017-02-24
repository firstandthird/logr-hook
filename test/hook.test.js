'use strict';
const Logr = require('logr');
const hapi = require('hapi');
const tape = require('tape');

tape('runs basic logging messages', (t) => {
  const allResults = [];
  let count = 0;
  const server = new hapi.Server();
  server.connection({ port: 8080 });
  server.route({
    method: 'POST',
    path: '/',
    handler: (request, reply) => {
      allResults.push(request.payload);
      reply(request.payload);
      count++;
      if (count === 7) {
        t.deepEqual(allResults, [
          { tags: [], message: 'message without tags' },
          { tags: ['debug'], message: 'message with tag' },
          { tags: ['warning'], message: 'message with warning tag' },
          { tags: ['notice'], message: 'message with notice tag' },
          { tags: ['success'], message: 'message with success tag' },
          { tags: ['error', 'blah'], message: 'message with error tag' },
          { tags: ['obj'], message: { message: 'simple object' } }
        ]);
        server.stop(t.end);
      }
    }
  });
  server.start(() => {
    const log = Logr.createLogger({
      type: 'logrHook',
      reporters: {
        logrHook: {
          reporter: require('../')
        }
      }
    });
    log('message without tags');
    log(['debug'], 'message with tag');
    log(['warning'], 'message with warning tag');
    log(['notice'], 'message with notice tag');
    log(['success'], 'message with success tag');
    log(['error', 'blah'], 'message with error tag');
    log(['obj'], {
      message: 'simple object'
    });
  });
});
