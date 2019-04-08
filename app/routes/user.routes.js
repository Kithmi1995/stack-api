module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    const jwtMiddleware = require('../middleware/validateToken.js');

    // Retrieve all Users
    app.get('/users/all', jwtMiddleware.checkToken, users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', jwtMiddleware.checkToken, users.findOne);

    // Update a User with userId
    app.put('/users/:userId', jwtMiddleware.checkToken, users.update);

    // Delete a User with userId
    app.delete('/users/:userId', jwtMiddleware.checkToken, users.delete);

}
