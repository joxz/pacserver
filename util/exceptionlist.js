const db = require("../db");
const Exception = db.exceptions;

module.exports = async function getExceptions() {
    const data = await Exception.find();

    return data;
}