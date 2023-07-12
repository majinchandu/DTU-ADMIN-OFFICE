const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const TenderSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    File_No:{
        type:String
    },
    Name_Of_Allotment:{
        type:String
    },
    Allotee_name:{
        type:String
    },
    Vendor_Contact_No:{
        type:String
    },
    Date_Of_Award_Of_Contract:{
        type:String
    },
    Contract_Valid_Upto:{
        type:Date
    },
    Remarks:{
        type:String
    },
})

module.exports = mongoose.model("Tender",TenderSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye