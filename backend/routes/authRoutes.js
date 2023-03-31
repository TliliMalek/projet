const express = require("express");
const { register, loginuser, getCurrentUser, getAllUsers } = require("../controllers/authControllers");
const isAdmin = require("../middlewares/authorization/IsAdmin");
const IsAuth = require("../middlewares/authorization/IsAuth");
const {
  registerRules,
  validator,
  loginRules,
} = require("../middlewares/validation/bodyValidation");
const router = express.Router();
/**
 *@method POST /auth/signup
 *@description register new user
 *@access public
 */
router.post("/signup", registerRules, validator, register);
/**
 *@method POST /auth/signin
 *@description login user
 *@access public
 */

router.post("/signin", loginRules, validator, loginuser);

/**
 *@method GET /auth/
 *@description  utilisateur authentifié
 *@access private
 */
router.get("/",IsAuth(), getCurrentUser)
/**
 *@method GET /auth/all
 *@description  all users
 *@access protected(private+role)
 */
router.get("/all",IsAuth(),isAdmin, getAllUsers)

module.exports = router;
