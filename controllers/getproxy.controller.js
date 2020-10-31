const findProxy = require('../util/ipset');

exports.find = async (req, res) => {  
    try {
        // Validate querystring
        if (!req.query.ip) {
            res.status(400).send({ message: "Querystring can not be empty!" });
            return;
        }
        let queryIP = req.query.ip;

        /* send message if no valid proxy is found */
        const proxy = await findProxy(queryIP) || `No valid proxy found for ${queryIP}`;

        res.send(proxy);

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the IPSet."
        });
    }
};