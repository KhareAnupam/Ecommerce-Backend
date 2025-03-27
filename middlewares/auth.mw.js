/**
 * Create a mw will check if the request body is proper and correct
 */
const user_model = require('../models/user.model')
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")

const verifySignUpBody = async (req, res, next) => {

    try{
        //ceck for the name , email , userId 

            if(!req.body.name){
                return res.status(400).send({
                    message : "Failed: Name is required"
                })
            }
            if(!req.body.email){
                return res.status(400).send({
                    message : "Failed: email is required"
                })
            }
            if(!req.body.userId){
                return res.status(400).send({
                    message : "Failed: userId is required"
                })
            }


        // check if the user with the same userId
        const user = await user_model.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "Failed: UserId is already present"
            })
        }

next()

    }catch(err){
        console.log("Error while verifying the request body", err)
        res.status(500).send({
            message : "Error while verifying the request body"
        })
    }



}


const verifySignInBody = async (req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

const verifyToken = (req, res, next)=>{
    //cheack if the token is present
    const token = req.headers[ 'x-access-token']
    if(!token){
        return res.status(403).send({
            message : "No token found : UnAuthorized"
        })
    }
    // if its the valid token

    jwt.verify(token, auth_config.secret, async(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            })
        }
        const user = await user_model.findOne({userId : decoded.id})
        if(!user){
            return res.status(400).send({
                message : "UnAuthorized, this user for this token doesn't exist"
            })
        }

        //set the user info in the req body
        req.user = user

        next()
    })
    // then move to the next step

}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userTpe == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message : "Only ADMIN users are allowed to access this endpoint"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}