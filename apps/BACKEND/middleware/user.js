const jwt = require("jsonwebtoken");


function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
   // const words = token.split(" ");
    //const jwToken = words[1];
    
    const decodeValue = jwt.verify(token,JWT_SECRET);
    if(decodeValue.username)
    {
        req.username = decodeValue.username;
        next();
    }else{
        res.status(403).json({
            msg : " you are not authenticated"
        })
    }
}

module.exports = userMiddleware;