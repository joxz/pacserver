const findProxy = require('../util/ipset');
const exceptions = require('../util/exceptionlist');
const pac = require('pac-resolver');
const template = require('../util/template');
const defaults = require('../config/defaults');

module.exports = async function (req, res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

        /* set default proxy if result is undefined */
        const proxy = await findProxy(ip) || defaults.DEFAULT_PROXY;

        const exceptionsObj = await exceptions();

        /* fill template */
        const pacString = template(exceptionsObj, proxy);

        /* check PAC with pac-resolver */
        const findProxyForURL = pac(pacString);
        findProxyForURL(defaults.PAC_TEST_URL).catch(err => console.log(err));

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