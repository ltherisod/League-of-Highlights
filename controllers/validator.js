const joi = require('joi')

const validator = (req, res, next) => {
	const schema = joi.object({
		name: joi.string().pattern(new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$")).required().messages({
			'string.pattern.base': 'Only letters can be entered in the name',
		}),
		email: joi.string().email().min(6).message({
			'string.min': 'Your email must have at least 6 characters',
			'string.email': 'Please write a valid email address'
		}),
		password: joi.string().min(6).max(50).message({
			'string.min': 'Your password must have at least 6 characters',
			'string.max': 'Your password must have at max 50 characters',
		})
	}) 

	const validation = schema.validation(req.body, {abortEarly: false})
	if(!validation.error){
		next()
	}else{
		res.json({success: false, error: validation.error.details})
	}
		

}

module.exports = validator