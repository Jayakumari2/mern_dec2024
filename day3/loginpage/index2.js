const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const food = require('../model/food');

const app=express();
app.use(express.json());
app.use(cors());

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
})

const User=mongoose.model("User",userschema)
const foodschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastdate:{
        type:Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
const Food=mongoose.model('Food',foodschema);

const verifyToken =(req,res,next)=>{//if it has next token then it is middelware
    let token=req.headers['authorisation'];
    token=token.replace('bearer',"");
    if(!token) return res.status(403).json({message:'token not provided'})
        jwt.verify(token,"secretkey",(err,decoded)=>{
          if(err)  return res.status(401).json({message:'failed authentication'})
         req.user=decoded.userId;
         next();
    })
 }

app.post('/api/register',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const hashedpassword=await bcrypt.hash(password,10);
        const user=new User({username,password:hashedpassword});
        await user.save();
        res.status(201).json({message:"user registered successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'failed to register user'});
    }
})

app.post('/api/login',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(401).json({error:'invalid credential'});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({error:"invalid credential"});
        }
        const token=jwt.sign({userId:user._id},'secretkey',{expiresIn:'1h'});
        res.json({token,userId:user._id});
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'failed to login user'});
    }
});

app.post('/api/foods',verifyToken,async(req,res)=>{
    try{   //only verified person can acess token
    const {name,lastdate}=req.body;
    const food=new Food({
        name,
        lastdate:new Date(lastdate),
        user:req.userId
    });
    await food.save();
    res.status(201).json({error:'food added successfully'});}
    catch(err){
        console.log(err);
        res.status(500).json({error:'failed to add food'});
    }
})

app.get('/api/foods',verifyToken,async(req,res)=>{
    try{
        const foods=await food.find({user:req.userId});
        res.json(foods);
    }catch(err){
        res.status(500).json({error:'failed to fetch food'});
    }
})

app.put('/api/foods/:id',verifyToken,async(req,res)=>{
    try{
        const {lastdate}=req.body;
        const food=await Food.findOneAndDelete(
            {_id:req.params.id,user:req.userId},
            {lastdate:new Date(lastdate)},
            {new:true}
    );
    if(!food){
        return res.status(404).json({error:'not found food'});
    }
    res.json(food);
    }catch(err){
           console.log(err);
           res.status(500).json({error:'failed to fetch food'});
    }
})


const port=process.env.PORT ||3002;
app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})