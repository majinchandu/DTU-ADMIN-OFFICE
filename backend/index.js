const express = require('express')
const mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://GOFOOD:chauhan20@cluster0.vyzojrl.mongodb.net/DTUAdminOffice'; //apne cluster ka link bhejdoo
mongoose.connect(mongoDB, { useNewUrlParser: true }); // connecting mongodb with backend


mongoose.set('strictQuery', false);
const Employees = require('../backend/EmployeesSchema')
const Admin = require("../backend/AdminSchema")
const Basicfacilities = require('../backend/BasicfacilitiesSchema2')
const Tender = require('../backend/TenderSchema')
const Dghs = require('../backend/DghsSchema')
const TenderPopup = require('../backend/TenderPopupSchema')
const Stafflist = require('../backend/OutsourcingStaffList')
const Salarylist = require('../backend/OutsourcingSalaryList')
// const Baicfacilities = require("../backend/AdminSchema")
const app = express()
const port = 5000
app.use(express.json())
const cors = require("cors")//npm package to remove cors error
app.use(cors())//middleware to resolve cors issue

const Jwt = require('jsonwebtoken');
const { useParams } = require('react-router-dom');
// const  Basicfacilities2  = require('../myapp/src/components/departments/reimbursement/Basicfacilities2');
// const DghsWordDoc = require('../backend/DghsWordDoc');
const jwtKey = 'dtuadminoffice'


app.post('/register', async function (req, res) {
  let user = await new Employees(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await user.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})


app.post('/loginemployee', async function (req, res) {
  console.log(req.body);// jo input aaya hai usko dikhao
  if (req.body.password && req.body.email && req.body.name) { // agar input me email aur password aayi hai tabhi hi chale warna na chale 
    let exisUser = await Employees.findOne(req.body).select("-password") //dekho ki existing user hai ki nhi aur usme se password hatadoo 
    console.log(exisUser);

    if (exisUser) {
      Jwt.sign({ exisUser }, jwtKey, (err, token) => {
        if (err) {
          res.send("Something went wrong")
        }
        res.send({ exisUser, auth: token })
      })
    } else {
      res.send({ result: "No User found" })
    }

  } else {// email ya password me se koi ek cheez ya dono nhi daale
    res.send("Result not found")
    console.log('chandu3');
  }

})

// app.post('/register', async function (req, res) {
//   let user = await new Admin(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
//   let result = await user.save();// data mongodb ke user table me store ho rha hai
//   // we cant use .select to remove password because the user is being created here we are selecting it 
//   result = result.toObject() // converting to object
//   delete result.password // deletes/hides password as it is good practice
//   console.log(req.body);
//   res.send(result);
// })


// app.post('/loginadmin', async function (req, res) {
//   console.log(req.body);// jo input aaya hai usko dikhao
//   if (req.body.password && req.body.email) { // agar input me email aur password aayi hai tabhi hi chale warna na chale 
//     let exisUser = await Admin.findOne({email:req.body.email}).select("-password") //dekho ki existing user hai ki nhi aur usme se password hatadoo 
//     console.log(exisUser);
//     if (exisUser) {  // agar user mila to chalao
//       res.send(exisUser)
//       console.log('chandu');
//     } else {// nhi to likhdo no user found
//       res.send("Result not found")
//       console.log('chandu2');
//     }
//   } else {// email ya password me se koi ek cheez ya dono nhi daale
//     res.send("Result not found")
//     console.log('chandu3');
//   }

// })


app.post('/loginadmin', async function (req, res) {
  console.log(req.body);// jo input aaya hai usko dikhao
  if (req.body.password && req.body.email) { // agar input me email aur password aayi hai tabhi hi chale warna na chale 
    let exisUser = await Admin.findOne(req.body).select("-password") //dekho ki existing user hai ki nhi aur usme se password hatadoo 
    console.log(exisUser);

    if (exisUser) {
      Jwt.sign({ exisUser }, jwtKey, (err, token) => {
        if (err) {
          res.send("Something went wrong")
        }
        res.send({ exisUser, auth: token })
      })
    } else {
      res.send({ result: "No User found" })
    }

  } else {// email ya password me se koi ek cheez ya dono nhi daale
    res.send("Result not found")
    console.log('chandu3');
  }

})


app.get('/employeeslist', async (req, res) => {

  let employees = await Employees.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (employees.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(employees); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no employees found"); //ye message bhejdo 
  }
})

// app.patch("/employeeslist/:id", async (req, res) => {
//   try{
//     const _id = req.params.id ;
//     const updateemployees = await Employees.findByIdAndUpdate(_id, req.body, {
//       new: true
//     }) ;
//     res.send(updateemployees);
//   }
//   catch(e) {
//     res.status(400).send(e);
//   }
// })


app.put('/employeeslist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Employees.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});


app.delete('/employeeslist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Employees.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});


// BASICFACILITIES
app.get('/basicfacilitieslist', async (req, res) => {

  let basicfacilities = await Basicfacilities.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (basicfacilities.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(basicfacilities); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no basicfacilities found"); //ye message bhejdo 
  }
})

// api to get single product
app.get('/basicfacilitieslist/:id', async (req, res) => {

  let result8 = await Basicfacilities.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
  if (result8) { // agar product mila to chalao
    res.send(result8)
  } else { // agar user nhi mila to chalao
    res.send("no result found")
  }
})

app.put('/basicfacilitieslist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Basicfacilities.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});

// app.put('/disableenable/:id', async function (req, res) { // put methd is used to update a function
//   let result10 = await Basicfacilities.updateOne(
//     { _id: req.params.id },// jiske basis pe update karani hai
//     { $set: req.body }// jo update karani hai (ratlo)
//   )
//   console.log(result10);
//   res.send(result10) // ye karna zaruri hai put function ke saath 
// });

app.patch("/entitlement/:id", async (req, res) => {
  try{
    const _id = req.params.id ;
    const updateentitlement = await Basicfacilities.findByIdAndUpdate(_id, req.body, {
      new: true
    }) ;
    res.send(updateentitlement);
  }
  catch(e) {
    res.status(400).send(e);
  }
})

app.post('/registerbasicfacilities', async function (req, res) {
  let basicfacility = await new Basicfacilities(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await basicfacility.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  // delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})

app.delete('/basicfacilitieslist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Basicfacilities.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});


// TENDER

app.get('/tenderlist', async (req, res) => {

  let tender = await Tender.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (tender.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(tender); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no tenderlist found"); //ye message bhejdo 
  }
})

app.get('/tenderlist/:id', async (req, res) => {

  let result8 = await Tender.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
  if (result8) { // agar product mila to chalao
    res.send(result8)
  } else { // agar user nhi mila to chalao
    res.send("no result found")
  }
})

app.put('/tenderlist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Tender.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});


app.post('/registertender', async function (req, res) {
  let tender = await new Tender(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await tender.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  // delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})

app.delete('/tenderlist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Tender.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});

//  TENDER POPUP 

app.get('/tenderpopup', async (req, res) => {

  let tenderpopup = await TenderPopup.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (tenderpopup.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(tenderpopup); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no tenderlist found"); //ye message bhejdo 
  }
})

app.put('/updatepopup/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await TenderPopup.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});


// DGHS

app.get('/dghslist', async (req, res) => {

  let dghs = await Dghs.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (dghs.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(dghs); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no dghslist found"); //ye message bhejdo 
  }
})

app.get('/dghslist/:id', async (req, res) => {

  let result8 = await Dghs.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
  if (result8) { // agar product mila to chalao
    res.send(result8)
  } else { // agar user nhi mila to chalao
    res.send("no result found")
  }
})

app.put('/dghslist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Dghs.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});


app.post('/registerdghs', async function (req, res) {
  let dghs = await new Dghs(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await dghs.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  // delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})

app.delete('/dghslist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Dghs.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});


// DGHS ENDS

// OUTSOURCING 
// i) stafflist 
app.get('/stafflist', async (req, res) => {

  let stafflist = await Stafflist.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (stafflist.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(stafflist); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no stafflist found"); //ye message bhejdo 
  }
})

app.post('/registerstafflist', async function (req, res) {
  let stafflist = await new Stafflist(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await stafflist.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  // delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})

app.get('/stafflist/:id', async (req, res) => {

  let result8 = await Stafflist.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
  if (result8) { // agar product mila to chalao
    res.send(result8)
  } else { // agar user nhi mila to chalao
    res.send("no result found")
  }
})

app.put('/stafflist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Stafflist.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});

app.delete('/stafflist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Stafflist.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});

// ii) salary list

app.get('/salarylist', async (req, res) => {

  let salarylist = await Salarylist.find(); // saare employees aajaenge to product table me hai jase hi api load hoga
  if (salarylist.length > 0) { // agar employees table empty nhi hai to chalao
    res.send(salarylist); // employees list send kardo
  } else { // agar employees table empty hai
    res.send("no salarylist found"); //ye message bhejdo 
  }
})

app.post('/registersalarylist', async function (req, res) {
  let salarylist = await new Salarylist(req.body); // jo frontend se data aa rha hai wo nye user me store ho rha hai
  let result = await salarylist.save();// data mongodb ke user table me store ho rha hai
  // we cant use .select to remove password because the user is being created here we are selecting it 
  result = result.toObject() // converting to object
  // delete result.password // deletes/hides password as it is good practice
  console.log(req.body);
  res.send(result);
})

app.get('/salarylist/:id', async (req, res) => {

  let result8 = await Salarylist.findOne({ _id: req.params.id })// getting the product by comparing its id given in parameters with any id in the collection
  if (result8) { // agar product mila to chalao
    res.send(result8)
  } else { // agar user nhi mila to chalao
    res.send("no result found")
  }
})

app.put('/salarylist/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Salarylist.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});

app.delete('/salarylist/:id', async function (req, res) { // id product id hai jo unique hogi wo delete hogi 
  const result7 = await Salarylist.deleteOne({ _id: req.params.id })//Product table me se wo product delete karo jiski _id, req.params.id ke equal hogi (params wo id hogi jo input me pass ki hai )
  res.send(result7);
});

// CHANGE ROLES

app.put('/changeroles/:id', async function (req, res) { // put methd is used to update a function
  let result10 = await Employees.updateOne(
    { _id: req.params.id },// jiske basis pe update karani hai
    { $set: req.body }// jo update karani hai (ratlo)
  )
  console.log(result10);
  res.send(result10) // ye karna zaruri hai put function ke saath 
});

// SEARCH  API 
app.get('/searchDghs/:key', async (req, res) => {
  let result12 = await Dghs.find({
    "$or": [
      {Name_Of_Official : { $regex: req.params.key } },// name ko search karne ke liye
      { Designation_Of_Official: { $regex: req.params.key } }, // company ko search karne ke liye
      { Department: { $regex: req.params.key } }, // category ko search karne ke liye
      {Card_No : { $regex: req.params.key } },// name ko search karne ke liye
      { Date_Of_Issue: { $regex: req.params.key } }, // company ko search karne ke liye
      { Remarks: { $regex: req.params.key } } // category ko search karne ke liye
    ]
  });
  res.send(result12);
})

app.get('/searchTender/:key', async (req, res) => {
  let result12 = await Tender.find({
    "$or": [
      {File_No : { $regex: req.params.key } },// name ko search karne ke liye
      { Name_Of_Allotment: { $regex: req.params.key } }, // company ko search karne ke liye
      { Allotee_name: { $regex: req.params.key } }, // category ko search karne ke liye
      {Vendor_Contact_No : { $regex: req.params.key } },// name ko search karne ke liye
      { Date_Of_Award_Of_Contract: { $regex: req.params.key } }, // company ko search karne ke liye
      { Remarks: { $regex: req.params.key } } // category ko search karne ke liye
    ]
  });
  res.send(result12);
})


app.get('/searchStafflist/:key', async (req, res) => {
  let result12 = await Stafflist.find({
    "$or": [
      {Name_Of_Official : { $regex: req.params.key } },// name ko search karne ke liye
      { Father_Husband_Name: { $regex: req.params.key } }, // company ko search karne ke liye
      { Designation_Of_Official: { $regex: req.params.key } }, // category ko search karne ke liye
      {Department : { $regex: req.params.key } },// name ko search karne ke liye
    ]
  });
  res.send(result12);
})

app.get('/searchSalarylist/:key', async (req, res) => {
  let result12 = await Salarylist.find({
    "$or": [
      { Emp_no: { $regex: req.params.key } },// name ko search karne ke liye
      { Name: { $regex: req.params.key } }, // company ko search karne ke liye
      { Gender: { $regex: req.params.key } }, // category ko search karne ke liye
      {Designation : { $regex: req.params.key } },// name ko search karne ke liye
    ]
  });
  res.send(result12);
})

app.get('/searchBasicFacilities/:key', async (req, res) => {
  let result12 = await Basicfacilities.find({
    "$or": [
      {Designation : { $regex: req.params.key } },// name ko search karne ke liye
      { NameOfDept: { $regex: req.params.key } }, // company ko search karne ke liye
      { Name: { $regex: req.params.key } }, // category ko search karne ke liye
      // {Entitlement : { $regex: req.params.key } },// name ko search karne ke liye
    ]
  });
  res.send(result12);
})


app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

