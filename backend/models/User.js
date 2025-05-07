const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
  fullName:{
    type:String,
    required:[true,'Full name is required'],
    trim:true
  },
  email:{
    type:String,
    required:[true,'Email is required'],
    unique:true,
    lowercase:true,
    trim:true,
    match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,'Please enter a valid email'] //from here we verify the email from regex
  },
  password:{
    type:String,
    required:[true,'Password is required'],
    minlength:[8,'Password must be at least 8 characters long'],
    select:false
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

// Hash password before saving
userSchema.pre('save',async function(next){
  if (!this.isModified('password')) return next()
  
  try{
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next()
  }catch(error){
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword=async function(candidatePassword){
  return await bcrypt.compare(candidatePassword,this.password)
}

const User=mongoose.model('User',userSchema)

module.exports=User 