const mongoose=require('mongoose');

const foodschema=new mongoose.Schema({
    foodname:{
        type:String,
        required:true
    },
    dayiate:{
        type:Number,
        required:true
    }
})


const food=mongoose.model('food',foodschema);
module.exports=food;