class AuthService{
    static findAccount(req, res) {
        const {email, password} = req.body;
        return email == "admin@gmail.com" && password == "1234";
    }
}

module.exports = AuthService;