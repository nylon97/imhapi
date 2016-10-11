'use strict';

const Hapi = require('hapi');
const Version = require('./version');

//Declare internals
const internals = {};

exports.init = (ports, next) => {
    // Create a server with a host and port
    const server = new Hapi.Server();

    server.connection({ port: ports });
    console.log({ 'version': internals.response });

    // Start the server
    server.register(Version, (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};
