const findProxy = require('../util/ipset');
const exceptions = require('../util/exceptionlist');
const pac = require('pac-resolver');

module.exports = async function (req, res) {
    try {
        const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

        const proxy = await findProxy(ip);

        const exceptionsObj = await exceptions();

        const pacString = `
function FindProxyForURL(url, host) {
    var privateIP = /^(0|10|127|192.168|172.1[6789]|172.2[0-9]|172.3[01]|169.254|192.88.99).[0-9.]+$/;
    var resolved_ip = dnsResolve(host);

    /* Don't send non-FQDN or private IP auths to us */
	if (isPlainHostName(host) || isInNet(resolved_ip, "192.0.2.0","255.255.255.0") || privateIP.test(host)) {
        return "DIRECT";
    }
    /* FTP goes directly */
	if (url.substring(0,4) == "ftp:") {
		return "DIRECT";
	}
        ${exceptionsObj.map(({domain, proxystring}) => `
    if (dnsDomainIs(host, "${domain}")) return "${proxystring}";`).join('')}
    
    return "${proxy}";
}`;
        /* check PAC with pac-resolver */
        const findProxyForURL = pac(pacString);
        findProxyForURL('ftp://10.0.0.0').catch(err => console.log(err));

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