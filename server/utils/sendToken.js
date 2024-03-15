const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_KEY)
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;