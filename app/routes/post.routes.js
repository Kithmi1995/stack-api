module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    const jwtMiddleware = require('../middleware/validateToken.js');

    // Create a new Post
    app.post('/posts', jwtMiddleware.checkToken, posts.create);

    // Retrieve all Posts
    app.get('/posts/all', jwtMiddleware.checkToken, posts.findAll);

    // Retrieve a single Post with postId
    app.get('/posts/:postId', jwtMiddleware.checkToken, posts.findOne);

    // Update a Post with postId
    app.put('/posts/:postId', jwtMiddleware.checkToken, posts.update);

    // Delete a Post with postId
    app.delete('/posts/:postId', jwtMiddleware.checkToken, posts.delete);
}