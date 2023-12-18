var express = require("express");
var configViewEngine = require ("./src/configs/viewEngine");
var initWebroute = require("./src/route/web");
var initAPIRoute = require ("./src/route/api");
var session = require('express-session')
const flash = require('connect-flash')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// read req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash());


// setup view engine
configViewEngine.configViewEngine(app);

// init webroute
initWebroute.initWebroute(app)

// init api route
initAPIRoute.initAPIRoute(app)

app.listen(port,()=>console.log("ok"))