const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const DghsSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    Name_Of_Official:{
        type:String
    },
    Designation_Of_Official:{
        type:String
    },
    Department:{
        type:String
    },
    Card_No:{
        type:String
    },
    Date_Of_Issue:{
        type:String
    },
    Remarks:{
        type:String
    },
})

module.exports = mongoose.model("Dghs",DghsSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye