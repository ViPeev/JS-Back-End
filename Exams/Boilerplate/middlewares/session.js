module.exports = () => (req,res,next) => {
    const token = req.cookies.token;
    console.log(token);
    if(token){
        try{
            const userData = verifyToken(token);
            req.user = userData;
        }catch(err){
            console.log('Invalid token')
            res.clearCookie('token');
            return res.redirect('/auth/login');
        }
    }
    next();
}