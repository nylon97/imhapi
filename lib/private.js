'use strict';

const Basic = require('hapi-auth-basic');
const User = require('./users.json');

const internals = {};

internals.validateFunc = function (request, username, password, callback){

    const user = User[username];
    if (user && password === user.password){
        return callback(null, true, user);
    }
    return callback(null, false);
};

exports.register = function (server, options, next) {

    server.register(Basic, (err) => {

        if (err){
            return next(err);
        }

        server.auth.strategy('basic', 'basic', { validateFunc: internals.validateFunc });

        // Add the route
        server.route({
            method: 'GET',
            path:'/private',
            config: {
                auth: 'basic',
                description: 'Retorna un mensaje positivo para la autentificación del usuario',
                handler:  (request, reply) => {

                    return reply( 'Hola ' + request.auth.credentials.username );
                }
            }
        });
        return next();
    });
};

exports.register.attributes = {
    name: 'Private'
};
