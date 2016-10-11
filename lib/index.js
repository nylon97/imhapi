'use strict';

const Hapi = require('hapi');
const Version = require('./version');
const Private = require('./private');

//Declare internals
const internals = {};

exports.init = (ports, next) => {
    // Create a server with a host and port
    const server = new Hapi.Server();

    server.connection({ port: ports });

    // Start the server
    server.register([Version, Private] , (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};
