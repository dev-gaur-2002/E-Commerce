const mongoose = require('mongoose')

const connectDb  =  async (connectionString) =>{
    return await mongoose.connect(connectionString , {
       useNewUrlParser:true,
       useUnifiedTopology:true
   }).then(console.log('database connected successfully'))
    .catch((err)=>{
        console.log(err)
    })
}
    
module.exports = connectDb