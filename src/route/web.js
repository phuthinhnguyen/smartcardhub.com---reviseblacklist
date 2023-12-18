var express = require("express");
var homeController = require("../controller/homeController");
var multer = require("multer");
var path = require("path");
var appRoot = require("app-root-path");
let route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({storage: storage, fileFilter:imageFilter});

const initWebroute = (app) =>{
    route.get("/admin",homeController.isAuthenticated,homeController.admin)
    route.get("/forgotpassword",homeController.forgotPassword);
    route.get("/logout",homeController.logout);
    route.get("/", homeController.getHomepage);
    route.get("/signin", homeController.signIn);
    route.get("/:cardid/userinfo",homeController.isAuthenticated,homeController.userInfo);
    route.get("/:cardid", homeController.cardId);
    route.post("/:cardid/processsignup", homeController.processSignUp);
    route.post("/processLogin",homeController.processLogin);
    route.post("/:cardid/userinfo",upload.single("profile_pic"),homeController.handleUploadFile)
    route.post("/processForgotPassword",homeController.processForgotPassword)
    route.post("/addcardidtodatabase",homeController.addcardidtodatabase)
   
    return app.use("/",route)
}
module.exports={initWebroute}