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

    const collection_name="trainer";
    const collection_fields={
        name:String,
        location:String,
        technology:String,
        phoneno:String
    };
    const collection_config={
        timestamps:false
    };
    const schema=mongoose.Schema(collection_fields,collection_config);
    const trainermodel=mongoose.model(collection_name,schema);
//     const updateAllTrainers=async()=>{
//         await connecToMongo();
//         try {
//             const trainers=await trainermodel.updateOne({name:'arun'},{$set:{name :"ayan"}});
//             console.log('all trainers:',trainers);
//         }catch (err) {
//             console.log(err);
//         }finally{
//             await mongoose.disconnect();
//             console.log('disconnected ');
//         }
//     }
// updateAllTrainers();

    const updatebyname=async()=>{
        await connecToMongo();
        try {
            const trainers=await trainermodel.findOne({name:'arun'});
            if(trainers){
                trainers.phoneno="7894561230";
                const updated_trainer= await trainermodel.findOneAndUpdate(
                    {name:"arun"},
                    {phoneno:"7894561230"},
                    {new:true}
                )
            console.log('all trainers:',updated_trainer);
            }
        }catch (err) {
            console.log(err);
        }finally{
            await mongoose.disconnect();
            console.log('disconnected ');
        }
    }
    updatebyname();

