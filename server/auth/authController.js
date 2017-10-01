exports.redirect = function (req, res, next) {
    res.redirect('/surveys');
};

exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
};
