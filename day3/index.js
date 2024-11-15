const express=require('express');
const mongoose=require('mongoose');
const cors=require ('cors');//cross origin resource sharing
const app=express();
const port=3000;
// require("dotenv").config();

const foodmodel=require('./model/food');

app.use(express.json());//to parse values as it will be understand by the server
app.use(cors());

mongoose.connect('mongodb+srv://2022isjayakumarirb:Jaya2004@cluster0.u7ocs.mongodb.net/');

app.post('/insert',async(req,res)=>{
    const foodname=req.body.foodname;
    const dayiate=req.body.dayiate;
    // const username=process.env.username;
    const food=new foodmodel({foodname:foodname,dayiate:dayiate})
    try{
        await food.save()
        res.send("inserted data");
    }catch(err){
        console.log(err);
    }
})


app.get('/read',async(req,res)=>{
    try{
       const result=await foodmodel.find({});
       res.send(result);
    }catch(err){
        console.log(err);
    }
})


// app.put('/update',async(req,res)=>{
//     const newfoodname=req.body.newfoodname;
//     const id=req.body.id;
//     try{
//        const updatedfood=await foodmodel.findById(id);
//        console.log(updatedfood)
//        updatedfood.foodname=newfoodname;
//         await updatedfood.save();
//     }catch(err){
//         console.log(err);
//     }
// })


app.put('/update', async (req, res) => {
    const newfoodname = req.body.newfoodname;
    const id = req.body.id;

    if (!newfoodname) {
        return res.status(400).json({ message: 'newfoodname is required' });
    }

    try {
        const updatedfood = await foodmodel.findById(id);

        if (!updatedfood) {
            return res.status(404).json({ message: 'Food not found' });
        }

        updatedfood.foodname = newfoodname;
        await updatedfood.save();

        res.status(200).json({ message: 'Food updated successfully', data: updatedfood });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.delete('/delete/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        await foodmodel.findByIdAndDelete(id);
        res.send("deleted");
    }catch(err){
        console.log(err);
    }
})



app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})