const jwt = require('jsonwebtoken');

const verify = function(req, res,next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.MY_SECRET_KEY, (err, user)=>{
            if(err) res.status(404).json('invalid token')
            req.user = user;
            next();
        })
    }else{
        res.status(200).json('you are not an authenticated user')
    }
}

module.exports = verify;