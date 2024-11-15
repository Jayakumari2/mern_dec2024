const express=require('express');
const mongoose=require('mongoose');
const cors=require ('cors');//cross origin resource sharing
const app=express();
const port=3000;
// require("dotenv").config();

const restoModel=require('./model/resto');

app.use(express.json());//to parse values as it will be understand by the server
app.use(cors());

mongoose.connect('mongodb+srv://2022isjayakumarirb:Jaya2004@cluster0.u7ocs.mongodb.net/');

app.post('/insert',async(req,res)=>{
    const restoName=req.body.restoName;
    const location=req.body.location;
    const rating=req.body.rating;
    const topFood=req.body.topFood;
    // const username=process.env.username;
    const resto=new restoModel({restoName:restoName,location:location,rating:rating,topFood:topFood})
    try{
        await resto.save()
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
})


app.get('/read',async(req,res)=>{
    try{
       const result=await restoModel.find({});
       res.send(result);
    }catch(err){
        console.log(err);
    }
})


app.put('/put', async (req, res) => {
    const { id, location } = req.body;
    try {
      const updatedResto = await restoModel.findById(id);
    
      updatedResto.location = location;
      await updatedResto.save(); 

      res.send("location updated successfully"); 
    } catch (error) { 
      console.error("Error updating location:", error);
      res.status(500).send("Error updating location");
    }
});



app.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await restoModel.findByIdAndDelete(id);
        res.send("deleted");
    }catch(err){
        console.log(err);
    }
})


app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})