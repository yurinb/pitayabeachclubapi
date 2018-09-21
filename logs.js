function dateNow() {
    return '_-> ' + new Date(Date.now()).toLocaleString() + '__--->';
}

function redLog(text) {
    return ('\x1b[31m%s\x1b[31m', text);
}

function greenLog(text) {
    return ('\x1b[32m%s\x1b[32m', text);
}

function blueLog(text) {
    return ('\x1b[34m%s\x1b[34m', text);
}


module.exports = {
    dateNow,
    redLog,
    greenLog,
    blueLog
};