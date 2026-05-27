const axios = require("axios");

const {
    AUTH_API
} = require("../config/apiConfig.js");

exports.loginUser = async (userData) => {

    const response = await axios.post(
        `${AUTH_API}/users/login`,
        userData
    );

    return response.data;
};