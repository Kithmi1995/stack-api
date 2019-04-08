const User = require('../models/user.model.js');

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

const config = require('../../config/jwt.config.js');


// Login user
exports.login = (req, res) => {
 // Validate request
 if(!req.body.username) {
    return res.status(400).send({
        message: "Username can not be empty"
    });
}

let passwordHash = bcrypt.hashSync(req.body.password, 10);

    console.log("passwordHash: "+passwordHash);

    User.findOne({ username: req.body.username})
    .then(user => {

        // console.log(user);
        if(!user){
            res.status(404).send({
                message: "User not found"
            });
        }
        else{
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    let token = jwt.sign({user}, config.secret, { expiresIn: '1h' });

                    if(!req.session.token){
                        req.session.token = token;

                        req.session.save(function(err) {
                            // session saved
                            console.log("session was saved");
                          });
                    }
                    
                    res.send(token);

                } else {
                    res.status(401).send({
                        message: "Unauthorized requst, Incorrect credentials"
                    });
                }
              });
        }
    }).catch(err => {
        res.status(401).send({
            message: err.message || "Some error occurred while user login."
        });
    });

};

//Register user
exports.register = (req, res) => {
// Validate request
if(!req.body.username) {
    return res.status(400).send({
        message: "User content can not be empty"
    });
}

let passwordHash = bcrypt.hashSync(req.body.password, 10);


// Create a User
const user = new User({
    title: req.body.title || "Untitled User", 
    
    username: req.body.username,
    password: passwordHash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    avatarurl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Iu3C-Bq2148K93nC3NooTUg340W3gRg3-DEnUtIc2zhpCtDJ",
    enableflag: req.body.enableflag,
    userLevel: req.body. userLevel
   

});

// Save User in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
    });
});

};

//logout 

exports.logout = (req, res) => {
    // Validate request

   if(req.session.token){
    req.session.token = null;
    res.send({
        message: "logout successful"
    });
   }
   else{
    res.send({
        message: "session not set"
    });
   }
   
    
   }; 


// check username

exports.checUsername = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }

    try {

        User.findOne({ username: req.body.username})
        .then(user => {
            if(!user){
                res.send({
                    status: 1,
                    message: "Username is avaliable"
                });
            }
            else{
                res.send({
                    status: 0,
                    message: "Username is NOT avaliable"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while checking username."
            });
        });
    } catch(err) {
    // err
    res.status(401).send({
            message: "Database connection error"
        });
    }


}; 

   
// reset password

exports.resetPassword = (req, res) => {
    // Validate request
    if(!req.body.username || !req.body.old_password || !req.body.new_password) {
       return res.status(400).send({
           message: "Required fields can not be empty"
       });
   }
   
   let oldpasswordHash = bcrypt.hashSync(req.body.old_password, 10);

   let newpasswordHash = bcrypt.hashSync(req.body.new_password, 10);
   
    //    console.log("passwordHash: "+passwordHash);
   
       User.findOne({ username: req.body.username})
       .then(user => {
   
           // console.log(user);
           if(!user){
               res.status(404).send({
                   message: "User not found"
               });
           }
           else{
               bcrypt.compare(req.body.old_password, user.password, function (err, result) {
                   if (result == true) {
                       
                    User.findByIdAndUpdate(user._id, {
                       
                        password: newpasswordHash
                        
                    }, {new: true})
                    .then(user => {
                        if(!user) {
                            return res.status(404).send({
                                message: "User not found with id " + user._id
                            });
                        }
                        res.send({
                            status: 1,
                            message: "Password reset successful"
                        });
                    }).catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "User not found with id " +  user._id
                            });                
                        }
                        return res.status(500).send({
                            message: "Error updating user with id " +  user._id
                        });
                    });
   
                   } else {
                       res.status(401).send({
                           message: "Unauthorized requst, Incorrect credentials"
                       });
                   }
                 });
           }
       }).catch(err => {
           res.status(401).send({
               message: err.message || "Some error occurred while user login."
           });
       });
   
   };


