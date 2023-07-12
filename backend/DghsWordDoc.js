const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const DghsWordDoc = new mongoose.Schema({ //intiallising the schema of the users table
    
    Doc:{
        type:Document
    }
})

module.exports = mongoose.model("DghsWordDoc",DghsWordDoc)// matlab users table ke andarr userSchema jasa schema follow hona hahiye