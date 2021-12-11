const { authJwt } = require("../security");
const controller = require("../controller/mainpage_controller");
const express = require("express");
const router = express.Router();


   router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/home", controller.allAccess);

    router.get(
        "/user",
        [authJwt.verifyToken],
        controller.userBoard
    );
module.exports = router;