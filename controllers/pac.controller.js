const findProxy = require('../util/ipset');
const exceptions = require('../util/exceptionlist');
const pac = require('pac-resolver');
const template = require('../util/template');

module.exports = async function (req, res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

        const proxy = await findProxy(ip);
        const exceptionsObj = await exceptions();

        /* fill template */
        const pacString = template(exceptionsObj, proxy);

        /* check PAC with pac-resolver */
        const findProxyForURL = pac(pacString);
        findProxyForURL('https://npmjs.org').catch(err => console.log(err));

        /* send response */
        res.header('content-Type', 'application/x-ns-proxy-autoconfig');
        res.send(pacString);

    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Error generating PAC File."
        });
    }
};