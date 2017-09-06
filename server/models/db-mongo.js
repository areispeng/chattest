const mongoose = require('mongoose');
const config = require('../config/mongo-config');


mongoose.Promise = require('bluebird');

const db = mongoose.connection.openUri("mongodb://" + config.HOST + ":" + config.PORT + "/" + config.NAME);

module.exports = db;
