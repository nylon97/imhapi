'use strict';

//Load modules
const Assert = require('assert');
const Server = require('./index');

Server.init(8000, (err, server) => {

    Assert(!err, err);
});
