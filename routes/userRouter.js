const express=require("express")
const authController=require("../controllers/userController")

const router=express.Router()

router.post("/signup",authController.signUp)
router.post("/login",authController.loginUser)

module.exports=router