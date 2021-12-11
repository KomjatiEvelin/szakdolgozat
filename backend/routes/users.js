const { verifySignUp } = require("../security");
const controller = require("../controller/user_controller");
const express = require("express");
const router = express.Router();


   router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/register",
        [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );

    router.post("/login", controller.signin);

module.exports = router;