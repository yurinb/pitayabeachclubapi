function dateNow() {
    return '_-> ' + new Date(Date.now()).toLocaleString() + '__--->';
}

function redLog(text) {
    return '\x1b[31m' + text + '\x1b[31m';
}

function greenLog(text) {
    return '\x1b[32m' + text + '\x1b[32m';
}

function yellowLog(text) {
    return '\x1b[33m' + text + '\x1b[33m';
}

function blueLog(text) {
    return '\x1b[34m' + text + '\x1b[34m';
}



module.exports = {
    dateNow,
    redLog,
    greenLog,
    yellowLog,
    blueLog,
};