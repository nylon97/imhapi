'use strict';

//Load modules
const Code = require('code');
const Lab = require('lab');
const Version = require('../lib/version');
const Server = require('../lib');
const Hapi = require('hapi');

//Test shortcouts
const lab = exports.lab = Lab.script();
const expect = Code.expect;
const it = lab.test;

it('inicia el servidor y devuelve un objeto server de hapi', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        Server.Stop(done);
    });
});

it('inicia el servidor en el puerto indicado', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.be.equal(5000);

        Server.Stop(done);
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

        expect(err).to.not.exist();
        expect(err.message).to.be.equal('register version failed');

        done();
    });
});
