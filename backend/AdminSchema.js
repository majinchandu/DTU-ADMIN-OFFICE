const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Admin",AdminSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye