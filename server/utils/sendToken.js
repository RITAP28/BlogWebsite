const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_KEY);
    console.log(token);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
    console.log(res.cookie);

};

module.exports = sendToken;