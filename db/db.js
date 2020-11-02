const mongoose = require("mongoose");

if (process.env.DEBUG) {
    mongoose.set('debug', true);
}

const db = {};
db.mongoose = mongoose;
db.url = process.env.DBURL;
db.networks = require("./networkschema.js")(mongoose);
db.exceptions = require("./exceptionschema.js")(mongoose);

module.exports = db;