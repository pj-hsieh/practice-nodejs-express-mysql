
exports.index_get = (req, res, next) => {
    var loginUser = null;
    var isLogin = false;
    if (req.session.isLogin) {
        loginUser = req.session.loginUser;
        isLogin = req.session.isLogin;
    }
    
    res.render("index", { loginUser, isLogin })
};
