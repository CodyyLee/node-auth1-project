module.exports = {
    verify
}

function verify(req, res, next, user) {
    console.log('middleware');
    next();
}