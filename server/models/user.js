const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        maxlength:[30,'name cannot exceed 30 letters'],
        minlength:[4,'name should have more than 4 characters'],
        required:[true , 'enter your name'],
    },
    Email:{
        type:String,
        required:[true , 'enter your email'],
        unique:true,
        validate:[validator.isEmail ,' please enter a valid email id ']
    },
    password:{
        type:String,
        required:[true , 'enter your password'],
        minlength:[8,'password should be greater than 8 characters'],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },

    resetPasswordToken : String,
    resetPasswordExpires : Date

})

UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password ,10)
})

UserSchema.methods.createJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRE
        }
    )
}

UserSchema.methods.comparePassword = async function(givenPassword){
    const val =  await bcrypt.compare(givenPassword,this.password)
    return val
}

// reset password
UserSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString('hex')
    
    // hash this token 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex') // this .digest is used to get the data in string , else it will be displayed in a buffer 
    this.resetPasswordExpires = Date.now() + (15*1000*60)
    
    return resetToken
}

module.exports  = mongoose.model('User',UserSchema)