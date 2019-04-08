const User = require('../models/user.model.js');

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

const config = require('../../config/jwt.config.js');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

try {

    
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
  } catch(err) {
    // err
    res.status(401).send({
        message: "Unauthorized request"
    });
  }

    
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }

    let passwordHash = bcrypt.hashSync(req.body.password, 10);

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled User",
        
        username: req.body.username,
        password: passwordHash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avatarurl: req.body.avatarurl,
        enableflag: req.body.enableflag,
        userLevel: req.body.userLevel


        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "(1) User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "(2) User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};