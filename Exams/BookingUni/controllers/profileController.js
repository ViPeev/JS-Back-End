const profileController = require('express').Router();

profileController.get('/',(req,res) => {
    res.render('profile',{
        title:'Profile page'
    });
});

module.exports = profileController;