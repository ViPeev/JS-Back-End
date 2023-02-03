const { getByIdRaw } = require("../services/courseService")

module.exports = () => async (req,res,next)=>{
    const course = await getByIdRaw(req.params.id);
    res.locals.course = course;
    next();
}