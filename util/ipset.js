const db = require("../db/db");
const Network = db.networks;
const { IPSet } = require('futoin-ipset');


module.exports = async function findProxyForIP(ip) {

    const ipset = new IPSet();

    const data = await Network.find();

    data.forEach(element => {
        let ipnetwork = ipset.convertAddress(`${element.network}`);
        ipset.add(ipnetwork, element.proxystring);
    });

    return ipset.match(ipset.convertAddress(`${ip}`))
}