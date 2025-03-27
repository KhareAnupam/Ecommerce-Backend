/**
 * POST 0.0.0.0:8080/ecom/api/v1/auth/Signup
 * 
 * I need to intercept this
 */
const authController = require('../controllers/auth.controller')
const authMW = require('../middlewares/auth.mw')

module.exports = (app) => {
    app.post("/ecom/api/v1/auth/Signup",[authMW.verifySignUpBody] ,authController.signup)

    // route for Post call Sign in
    // 0.0.0.0:8080/ecom/api/v1/auth/Signin
    app.post("/ecom/api/v1/auth/Signin",[authMW.verifySignInBody] ,authController.signin)

}
