module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    const jwtMiddleware = require('../middleware/validateToken.js');

    // Login a User
    app.post('/auth/login', auth.login);

    //Register a User
    app.post('/auth/register', auth.register);

    //Logout 
    app.post('/auth/logout', auth.logout);

    //Check username
    app.post('/auth/checkusername', auth.checUsername);

    // reset password
    app.post('/auth/resetpassword', jwtMiddleware.checkToken, auth.resetPassword);


}