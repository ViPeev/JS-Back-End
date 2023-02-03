const { register, login } = require("../services/userService");
const { parseError } = require("../util/parser");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  //TODO replace with actual view by assignment
  res.render("register", {
    title: "Register page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    if (req.body.repass !== req.body.password) {
      throw new Error("Password don't match!");
    }
    const token = await register(req.body.username, req.body.password);
    res.cookie("token", token);
    res.redirect("/auth/register");
  } catch (error) {
    const errors = parseError(error);
    //TODO add error display to actual template from assignment
    res.render('register',{
        title:'Register page',
        errors,
        body: {
            username:req.body.username
        }
    })
  }
});


authController.get("/login", (req, res) => {
  //TODO replace with actual view by assignment
  res.render("login", {
    title: "Login page",
  });
});

authController.post('/login',async (req,res)=> {
  try{
    if (req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    const token = await login(req.body.username,req.body.password);
    res.cookie("token", token);
    res.redirect('/'); //TODO Replace with redirect by assignment
  }catch(error){
   const errors = parseError(error);
   res.render('login',{
    title:'Login Page',
    errors,
    body:{
      username:body.username
    }
   })
  }
});

authController.get('/logout',(req,res)=>{
  res.clearCookie('token');
  res.redirect('/');
})

module.exports = authController;
