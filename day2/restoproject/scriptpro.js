const mongoose=require('mongoose');
const mongo_URL="mongodb+srv://2022isjayakumarirb:Jaya2004@cluster0.u7ocs.mongodb.net/"
const connecToMongo=async()=>{
    mongoose.Promise=global.Promise;
    try{
        await mongoose.connect(mongo_URL);
        console.log("connected to database");
    } catch(error){
        console.error("failed to connect to mongoose",error);
        process.exit(1)
    }
}

    const collection_name="Restaurant";
    const collection_fields={
        id:Number,
        name:String,
        type:String,
        location:String,
        rating:Number,
        top_food:String
    };
    const collection_config={
        timestamps:false
    };
    const schema=mongoose.Schema(collection_fields,collection_config);
    const restomodel=mongoose.model(collection_name,schema);

const createrestomodel=async()=>{
    await connecToMongo();

    try{
        const restomodel=new restomodel({
            _if:new mongoose.Types.ObjectId(),
            id:'1',
            name:'Maheshprasad',
            type:'Indian',
            location:'Mysore',
            rating:'0',
            top_food:'Benne Masala Dosa'
            
            
        })
        const createddocumanet=await restomodel.save();
        console.log('resto created successfully',createddocumanet);

    }catch(err){
       console.log(err);
    }finally{
        await mongoose.disconnect();
        console.log("disconnected");
    }
}
createrestomodel();
