const mongoose = require('mongoose')

const EmployeesSchema = new mongoose.Schema({ //intiallising the schema of the users table
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    }
})

module.exports = mongoose.model("Employees",EmployeesSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye