/**
 * Create a mw will check if the request body is proper and correct
 */
const user_model = require('../models/user.model')

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