const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken') 

const usersControllers = {
	singUp: async (req, res) => {
		try{
			const {name, email, password, icon} = req.body
			const hashedPass = bcryptjs.hashSync(password, 10)
			const userExists = await User.findOne({email: email})
			if(userExists) throw new Error("Email already in use !")
			const newUser = new User({
				name,
				email,
				password : hashedPass,
				icon
			})
			const user = await newUser.save()
			const token = jwt.sign({...user}, process.env.SECRETKEY)
			res.json(
				{
					success: true, 
					reponse: {
						name: newUser.name,
						icon: newUser.icon,
						email: newUser.email,
						_id: newUser._id,
						token
					},
					error: null
				})
		}catch (e){
			res.json({success: false, response: null, error: e.message})
		}
	},

	logIn: async (req, res) => {
		try{
			const {email, password} = req.body 
			const user = await User.findOne({email: email})
			if(!user) throw new Error('Email and/or password incorrect')
			const secretPassword = bcryptjs.compareSync(password, user.password)
			if(!secretPassword) throw new Error('Email and/or password incorrect')
			const token = jwt.sign({...user}, process.env.SECRETKEY)
			res.json(
				{
					success: true,
					reponse: {
						name: user.name,
						icon: user.icon,
						email: user.email,
						_id: user._id,
						token		
					},	 
					error: null
				})
			
		}catch(e){
			res.json({success: false, response: null, error: e.message})
		}
	}
}

module.exports  = usersControllers