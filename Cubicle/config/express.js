const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('../middleware/session');
const hbs = require('express-handlebars').create({
    extname: '.hbs'
});

module.exports = (app) => {
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.use(cors());
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session());
};