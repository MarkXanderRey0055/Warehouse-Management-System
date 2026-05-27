const {
    loginUser
} = require("../services/authService.js");

exports.login = async (req, res) => {

    try {

        const data =
        await loginUser(req.body);

        res.json(data);

    } catch(error){

        res.status(401).json({
            message:
            "Authentication Failed"
        });
    }
};