'use strict';

//Load modules
const Code = require('code');
const Lab = require('lab');
const Version = require('../lib/version');
const Server = require('../lib');
const Hapi = require('hapi');
const Private = require('../lib/private');

//Test shortcouts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('/', () => {

    it('inicia el servidor y devuelve un objeto server de hapi', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('inicia el servidor en el puerto indicado', (done) => {

        Server.init(5000, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(5000);

            server.stop(done);
        });
    });

    it('manejo de los errores de registro de un plugin', { parallel: false }, (done) => {

        const orig = Version.register;

        Version.register = function (server, options, next) {

            Version.register = orig;
            return next(new Error('register version failed'));
        };

        Version.register.attributes = {
            name: 'fake version'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.be.equal('register version failed');

            done();
        });
    });

    it('test de error de plugin private', { parallel: false }, (done) => {

        const orig = Private.register;

        Private.register = function (server, options, next) {

            Private.register = orig;
            return next(new Error('register private failed'));
        };

        Private.register.attributes = {
            name: 'fake private'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.be.equal('register private failed');

            done();
        });
    });
});
