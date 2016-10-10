'use strict';

const internals = {};
internals.PacketJson = require('../package.json');
internals.response = require(internals.PacketJson.version);

exports.register = function (server, options, next) {
    // Add the route
    server.route({
        method: 'GET',
        path:'/version',
        config: {
            handler: function (request, reply) {

                return reply({ 'version': internals.response });
            }
        }
    });
    next();
};

exports.register.attributes = {
    name: 'Version'
};
