/**
 * This will be the starting file of the project
 */
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs');

app.use(express.json());


/**
 * Create an admin user at the starting of the application
 * if not already present
 */

// connection with mongoDB
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to the database")
})
db.once("open",()=>{
    console.log("Connected to the database")
    init()
})

async function init(){
            try{
                let user = await user_model.findOne({userId : "admin"})
                if(user){
                    console.log("Admin user already present")
                    return;
                }

            }catch(err){
                console.log("Error while connecting to the database", err)
            }
    
    try{
        user = await user_model.create({
            name : "Anupam1",
            userId : "admin",
            email : "yash77@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome7",8)
        });

        console.log("Admin user created successfully", user)
    
    }catch(err){

        console.log("Error while creating admin user", err)
    
    }
}


/**
 * Stitch the route to the server (app)
 */

require('./routes/auth.route')(app);



/**
 * Start the server
 */

app.listen(server_config.PORT, ()=>{
    console.log("Server started at port num : ", server_config.PORT);
})
