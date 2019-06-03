import Joi from '@hapi/joi';



class Auth {
    signup(req, res, next){
        const schema = Joi.object().keys({ 
            firstName: Joi.string().alphanum().min(3).max(30).required().label('First name is required, must only contain alpha-numeric characters').trim().strict(),
            lastName: Joi.string().alphanum().min(3).max(30).required().label('Last name is required'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).label('Weak password, must be at least 8 characters and have at least 1 letter and number').required(),
            email: Joi.string().email({ minDomainSegments: 2 }).label('Invalid email format').required(),
            // isAdmin: Joi.boolean().required().valid(false, true).label('isAdmin should be false or true')
        })

        const {error} = Joi.validate(req.body, schema, { abortEarly: false })
        const data = [];
        if(error){
            const { details } = error;

            details.forEach((detail) => {
                const obj = { field: detail.path[0], msg: detail.context.label };
                data.push(obj);
            });
            return res.status(400).json({
                status: 400, 
                error: data,
            })

        }
        next();
        
        
    }
}

export default new Auth();