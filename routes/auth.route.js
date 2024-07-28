/**
 * POST 0.0.0.0:8080/ecom/api/v1/auth/Signup
 * 
 * I need to intercept this
 */
const authController = require('../controllers/auth.controller')


module.exports = (app) => {
    app.post("/ecom/api/v1/auth/Signup", authController.signup)
}