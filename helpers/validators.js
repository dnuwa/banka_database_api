import Joi from '@hapi/joi';

class Auth {
    signup(req, res, next) {
        const schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(30).required().label('First name is required, must only contain alpha-numeric characters').trim().strict(),
            lastName: Joi.string().alphanum().min(3).max(30).required().label('Last name is required'),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('Weak password, must be at least 8 characters and have at least 1 letter and number'),
            email: Joi.string().email({ minDomainSegments: 2 }).required().label('Invalid email format'),
            type: Joi.string().required().label('choose a user type')
            // isAdmin: Joi.boolean().required().valid(false, true).label('isAdmin should be false or true')
        })
        errorResponse(req, res, schema);
        next();
    }

    login(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().required().label('email is required'),
            password: Joi.string().required().label('password is required')
        })
        errorResponse(req, res, schema);
        next();
    }
}
export default new Auth();


const errorResponse = (request, response, schema) => {
    const { error } = Joi.validate(request.body, schema, { abortEarly: false })
    const data = [];

    if (error) {
        const { details } = error;

        details.forEach((detail) => {
            const obj = { field: detail.path[0], msg: detail.context.label };
            data.push(obj);
        });
        return response.status(400).json({
            status: 400,
            error: data,
        })
    };
}
