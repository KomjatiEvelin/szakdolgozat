const { authJwt } = require("../security");
const controller = require("../controller/learningMat_controller");
const controller2=require("../controller/exercise_controller")
const express = require("express");
const router = express.Router();


   router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    router.get(
        "/materials",
        [authJwt.verifyToken],
        controller.learningMaterials
    );

    router.get("/games",[authJwt.verifyToken],controller2.showExercises);

    router.get("/games/additongame",[authJwt.verifyToken]);

    router.post("/games/savescore",controller2.saveScore);

module.exports = router;
