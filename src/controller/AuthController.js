const AuthService = require("../service/auth.service");

class AuthController {
    static showFormLogin(req, res) {
        res.render('auth/login');
    }

    static login(req, res) {
        if(AuthService.findAccount(req, res)) {
            res.redirect('/home');
        }else {
            res.redirect("/login");
        }
    }
}

module.exports = AuthController;