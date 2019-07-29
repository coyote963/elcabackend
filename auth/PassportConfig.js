require('dotenv').config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require('./User')

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload._id)
            .then (user => {
                if (user) {
                   
                    return done (null, user);
                }
                
                return done(null, false);
            })
            .catch(
                err => {
                    
                    done (err, false);
                })
        })
    );
};