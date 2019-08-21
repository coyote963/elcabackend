require('dotenv').config();
const express = require('express');
const router  = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
var validateRegisterInput = require('./validateregister');
var validateLoginInput = require('./validatelogin');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var passport = require('passport')
var User = require('./User')
var { allowOnly } = require('../allowOnly')
// @route GET auth/
// @desc Get all the users
// @access Public
router.get('/', passport.authenticate('jwt', { session: false }), allowOnly('superAdmin', function(req, res) {
    User.find({}, ['_id', 'first_name', 'last_name', 'email', 'gender'],
    function (err, user) {
        if (err) return res.status(500).send("error getting the users");
        res.status(200).send(user);
    });
}));

// @route POST auth/register
// @desc Register a new user
// @access Public
router.post("/register", function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
        //res.status(400).send(errors);
    }
    
    User.findOne({ email : req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email : "Email already exists" });
        } else {
            
            const newUser = new User ({
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                password : req.body.password1,
                email : req.body.email
            })
            console.log(newUser);
            //Hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        res.status(400).send(err);
                    }
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                })
            })
        }
    })
});

// @route POST auth/login
// @desc Login User and assign JWT token
// @access Public
router.post("/login", function (req, res)  {
    const { errors , isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ email: "Email not found"});
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    name: user.email
                };
                jwt.sign(payload,
                    process.env.SECRET_OR_KEY,
                    {
                        expiresIn: 31556926 
                    },
                    (err, token) => {
                        res.json({
                            user: user,
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                )
            } else {
                res.status(400).json({ password : "Password Incorrect" });
            }
        })
    })
})


module.exports = router;