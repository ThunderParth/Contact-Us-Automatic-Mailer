const express = require("express");
const router = new express.Router();
const nodemailer=require("nodemailer");
router.post("/register", (req,res) =>{
    const {enteredVaules}=req.body;
    const enteredValues=res.body;
    console.log(req.body);
    try {
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        });
        const mailOptions={
            from:process.env.EMAIL,
            to:process.env.EMAIL,
            subject:"Test subject",
            html:`${req.body.message}`
            
        }
        transporter.sendMail(mailOptions),(error,info)=>{
            if(error){
                console.log("Error recieved");
            }
            else{
                console.log("Email sent w1"+info.response);
                res.status(201).json({status:201,info})
            }

        }
    } catch (error) {
        res.status(201).json({status:401,error})
    }
    
});
module.exports = router