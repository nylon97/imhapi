'use strict';

//Load modules
const Code = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const Server = require('../lib');

//Test shortcouts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('/version', () => {

    it('retornamos la versión de package.json', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal({ version : Package.version });

                server.stop(done);
            });
        });
    });
});
