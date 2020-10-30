const dbConfig = require("../config/properties");

const mongoose = require("mongoose");
mongoose.set('debug', true);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.networks = require("./networkschema.js")(mongoose);
db.exceptions = require("./exceptionschema.js")(mongoose);

module.exports = db;