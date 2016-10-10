'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Version = require('./version');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 3000
});

// Start the server
server.register(Version, (err) => {

    Hoek.assert(!err, err);
    if (err) {
        throw err;
    }
    server.start((err) => {

        Hoek.assert(!err, err);
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
