const { verifyToken } = require("../services/userServices");

module.exports = () => (req,res,next) => {
    const checkToken = req.cookies.jwt;
    if(checkToken){
       const token = verifyToken(checkToken);
       req.user = token;
       res.locals.user = token;
    }
    next();
}