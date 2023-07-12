const { defaults } = require('json-server')
const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const Salarylist = new mongoose.Schema({ //intiallising the schema of the users table
    
    Emp_no:{
        type:String
    },
    Name:{
        type:String
    },
    Gender:{
        type:String
    },
    Designation:{
        type:String
    },
    Present_Salary:{
        type:String
    },
    Total_days_in_months:{

    },
    Pay_days:{
        type:String
    },
    Fees_for_the_month:{
        type:String
    },
    EPF:{
        type:String
    },
    Admn_charges:{
        type:String
    },
    ESI:{
        type:String
    },
    Total_cost_for_DTU:{
        type:String
    }
})

module.exports = mongoose.model("Salarylist",Salarylist)// matlab users table ke andarr userSchema jasa schema follow hona hahiye