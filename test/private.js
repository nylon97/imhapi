'use strict';

//Load modules
const Code = require('code');
const Lab = require('lab');
const Basic = require('hapi-auth-basic');
const Server = require('../lib');

//Test shortcouts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const internals = {};

internals.request = function (username, password){

    return {
        method: 'GET',
        url: '/private',
        headers: {
            authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
        }
    };
};

describe('/private', () => {

    it('usuario autentificado', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('user1','pass1') , (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result, 'result').to.equal('Hola user1');

                server.stop(done);
            });
        });
    });

    it('usuario no exite', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('usuario no existente','pass1') , (res) => {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('usuario existe pero la contraseña es incorrecta', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject(internals.request('user1','esta mal esta contraseña') , (res) => {

                expect(res.statusCode).to.equal(401);

                server.stop(done);
            });
        });
    });

    it('test de error de plugin autentificacion', { parallel: false }, (done) => {

        const orig = Basic.register;

        Basic.register = function (server, options, next) {

            Basic.register = orig;
            return next(new Error('register autentificacion failed'));
        };

        Basic.register.attributes = {
            name: 'fake autentificacion'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.be.equal('register autentificacion failed');

            done();
        });
    });
});
