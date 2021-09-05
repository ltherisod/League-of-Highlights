const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy 
const extractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')

module.exports = passport.use(
	new jwtStrategy({
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.SECRETKEY
	},
	(payload, done)=>{
		User.findOne({_id : payload._doc._id})
		.then(respuesta => {
			if(!respuesta){
				return done(null, false)
			}else{
				return done(null, respuesta)
			}
		})
		.catch((error) => done(error, false))
	}
	)
)