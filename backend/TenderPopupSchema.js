const mongoose = require('mongoose')

const TenderPopupSchema = new mongoose.Schema({ //intiallising the schema of the users table
    
    text:{
        type:String
    }
})

module.exports = mongoose.model("TenderPopup",TenderPopupSchema)// matlab users table ke andarr userSchema jasa schema follow hona hahiye