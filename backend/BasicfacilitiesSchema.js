const mongoose = require('mongoose')

const BasicfacilitiesSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    title:{
        type:String
    },
    text:{
        type:String
    }

})

module.exports = mongoose.model("Basicfacilities",BasicfacilitiesSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye