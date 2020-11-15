const jwt = require('jsonwebtoken');

const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    } else if (req.headers.authorization) {
        const {authorization} = req.headers;

        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
        console.log("hi", payload);

        if(payload){
            User.findOne({
                where: {id: payload.id}
            })
            .then(user => {
                req.user = user;
                next()
            })
        } else {
            res.status(401).json({
                message: "Not authorized."
            })
        }
      } else {
        res.status(401).json({
            message: "Not allowed."
        })
      }
}

module.exports = validateSession;