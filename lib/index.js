'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

const internals = {};
internals.response = require('../package.json');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/version',
    handler: function (request, reply) {

        return reply({ 'version': internals.response });
    }
});

// Start the server
server.start((err) => {

    Hoek.assert(!err, err);
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
