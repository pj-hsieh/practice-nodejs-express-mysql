const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");

router.get('/signin', controller.signin_get);
router.post('/signin', controller.signin_post);
router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);
router.get('/signout', controller.signout_get);

module.exports = router;