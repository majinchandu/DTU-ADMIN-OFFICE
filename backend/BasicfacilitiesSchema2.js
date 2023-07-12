const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const BasicfacilitiesSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    Designation:{
        type:String
    },
    NameOfDept:{
        type:String
    },
    Name:{
        type:String
    },
    Entitlement:{
        type:Number
    },
    Disable:{
        type:Boolean,
        default:false
    }    

})

module.exports = mongoose.model("Basicfacilities",BasicfacilitiesSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye