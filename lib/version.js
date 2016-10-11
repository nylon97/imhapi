'use strict';

const PacketJson = require('../package.json');

const internals = {
    response: {
        version: PacketJson.version
    }
};

exports.register = function (server, options, next) {
    // Add the route
    server.route({
        method: 'GET',
        path:'/version',
        config: {
            handler: function (request, reply) {

                return reply(internals.response );
            }
        }
    });
    return next();
};

exports.register.attributes = {
    name: 'Version'
};
