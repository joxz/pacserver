/*
const db = require("../db");
const Network = db.networks;
const { IPSet } = require('futoin-ipset');
*/
const findProxy = require('../util/ipset')

exports.find = async (req, res) => {
    
    try {
        // Validate request
        if (!req.query.ip) {
            res.status(400).send({ message: "Querystring can not be empty!" });
            return;
          }
        let queryIP = req.query.ip;

        const proxy = await findProxy(queryIP);

        res.send(proxy);

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the IPSet."
        });
    }
};