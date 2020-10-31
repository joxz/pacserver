module.exports = (exceptions, proxy) => `
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
        ${exceptions.map(({domain, proxystring}) => `
    if (dnsDomainIs(host, "${domain}")) return "${proxystring}";`).join('')}
    
    return "${proxy}";
}`;