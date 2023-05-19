const getClientIp = (req) => {
    let ip = (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || '');
    if (ip.replace(/^.*:/, '') == "1") return "localhost"; 
    ip = ip.match(/((25[0-5]|(2[0-4]|1\d|[1-9])\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9])\d)/); 
    return !!ip ? ip[0] : null;
}

const getFormattedDate = (date = new Date()) => { 
    return date.toISOString().replace("T"," ").substring(0, 19);
}

module.exports = { getClientIp, getFormattedDate }