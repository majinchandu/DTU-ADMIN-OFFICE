const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const Stafflist = new mongoose.Schema({ //intiallising the schema of the users table
    
    Name_Of_Official:{
        type:String
    },
    Father_Husband_Name:{
        type:String
    },
    Designation_Of_Official:{
        type:String
    },
    Department:{
        type:String
    }
})

module.exports = mongoose.model("Stafflist",Stafflist)// matlab users table ke andarr userSchema jasa schema follow hona hahiye