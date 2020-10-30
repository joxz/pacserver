const db = require("../db");
const Network = db.networks;
const { IPSet } = require('futoin-ipset');

exports.find = async (req, res) => {
    
    try {
        // Validate request
        if (!req.query.ip) {
            res.status(400).send({ message: "Querystring can not be empty!" });
            return;
          }

        const ipset = new IPSet();
        let queryIP = req.query.ip;

        const data = await Network.find();
      
        data.forEach(element => {
            let ip = ipset.convertAddress(`${element.network}`);
            ipset.add(ip, element.proxystring);
        });

        res.send(ipset.match(ipset.convertAddress(`${queryIP}`)))
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the IPSet."
        });
    }
};