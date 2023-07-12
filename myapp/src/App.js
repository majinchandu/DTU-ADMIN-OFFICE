import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Download from "./components/Download";
import React, { useEffect, useState } from 'react'
// import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Administrator from "./components/Administrator";
import Employee from "./components/Employee";
import Employeedata from "./components/Employeedata";
import Admindata from "./components/Admindata";
import Protected from "./components/Protected";
import Signupusingadmin from "./components/Signupusingadmin";
import AssignData from "./components/AssignData";
import Protected2 from "./components/Protected2";
import Baicfacilities from "./components/departments/reimbursement/Baicfacilities";
import Basicfacilities2 from "./components/departments/reimbursement/Basicfacilities2";
import UpdateBasicFacilities from "./components/departments/reimbursement/UpdateBasicFacilities";
import Tender from "./components/departments/tender/Tender";
import UpdateTender from "./components/departments/tender/UpdateTender";
import UpdateDghs from "./components/departments/dghs/UpdateDghs";
import Doceditor from "./components/departments/dghs/Doceditor";
import Outsourcing from "./components/departments/outsourcing/Outsourcing";
import Salarylist from "./components/departments/outsourcing/Salarylist";
import Stafflist from "./components/departments/outsourcing/Stafflist";
import UpdateStafflist from "./components/departments/outsourcing/UpdateStafflist";
import UpdateSalaryList from "./components/departments/outsourcing/UpdateSalaryList";
import LoginAgain from "./components/LoginAgain";

function App() {
  // const [success, setsuccess] = useState(false)
  const [workvalue, setworkvalue] = useState("")
  // const [role, setrole] = useState(null)
  var success = false;
  const auth = localStorage.getItem("user")
  // useEffect(() => {
    
  //   if (JSON.parse(auth).role == "tender" || "reimbursement" || "dghs" || "outsourcing") {
  //     setrole(JSON.parse(auth).role )
  //   } else{
  //     setrole(null);
  //   }
  
  // }, [])
  
  return (
    <Router>
      <div className="App">
        <Navbar success={success} />
        <Routes>
          <Route path="/home" element={<Carousel />} />
          <Route path='/Download' element={<Download />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/" element={<Home />} />
          <Route path='/loginadmin' element={<Administrator />} success={success} />
          <Route path="/loginemployee" element={<Employee />} success={success} />
          <Route path="/employeedata" element={<Protected2 Component={<Employeedata />} />} />
          {/* <Route path="/admindata" element={<Admindata workvalue={workvalue} />} /> */}
          {/* <Route path="/signupusingadmin" element={< Protected  Component = {Signupusingadmin } />}  /> protected routes banane ki ninja technique ding ding */}
          {/* <Route path="/assignwork" element = {<Protected Component = {AssignData}  setworkvalue={setworkvalue} workvalue={workvalue} /> } /> */}

          {/* <Route path="/signupusingadmin" element={<Protected  Component = {<Signupusingadmin />} />} />
        <Route path="/assignwork" element = {<Protected Component = {<AssignData setworkvalue={setworkvalue} workvalue={workvalue} />}   /> } /> 
        <Route path="/admindata" element={<Protected Component={<Admindata workvalue={workvalue} />} />} /> 
        <Route path="/basicfacilities" element={<Baicfacilities />} />
        <Route path="/basicfacilities2" element={<Basicfacilities2 />} />
        <Route path="/updatebasicfacilities/:id" element={<UpdateBasicFacilities />} />
        <Route path="/updatetender/:id" element={<UpdateTender />} />
        <Route path="/updatedghs/:id" element={<UpdateDghs />} />
        <Route path="/doceditor" element={<Doceditor />} />
        <Route path="/outsourcing" element = {<Outsourcing />} />
        <Route path="/outsourceStaffList" element = {<Stafflist />} />
        <Route path = "/outsourceStaffSalary" element = {<Salarylist />} />
        <Route path="/updatestafflist/:id" element = {<UpdateStafflist />} /> */}


          <Route path="/signupusingadmin" element={<Protected Component={<Signupusingadmin />} />} />
          <Route path="/assignwork" element={<Protected Component={<AssignData setworkvalue={setworkvalue} workvalue={workvalue} />} />} />
          <Route path="/admindata" element={<Protected Component={<Admindata workvalue={workvalue} />} />} />
          {/* <Route path="/basicfacilities" element={<Baicfacilities />} /> */}
          <Route path="/basicfacilities2" element={<Protected2 Component = {<Basicfacilities2 />} />} />
          <Route path="/updatebasicfacilities/:id" element={<Protected2 Component = {<UpdateBasicFacilities />} />} />
          <Route path="/updatetender/:id" element={<Protected2 Component = {<UpdateTender />} />} />
          <Route path="/updatedghs/:id" element={<Protected2 Component = {<UpdateDghs />} />} />
          {/* <Route path="/doceditor" element={<Doceditor />} /> */}
          {/* <Route path="/outsourcing" element={<Outsourcing />} /> */}
          <Route path="/outsourceStaffList" element={<Protected2 Component = {<Stafflist />} />} />
          <Route path="/outsourceStaffSalary" element={<Protected2 Component = {<Salarylist />} />} />
          <Route path="/updatestafflist/:id" element={<Protected2 Component = {<UpdateStafflist />} />} />
          <Route path="/updatesalarylist/:id" element={<Protected2 Component = {<UpdateSalaryList />} />} />
          <Route path="/loginagain" element = {<LoginAgain />} /> 


          {/* <Route path="/Tender" element={<Tender />} /> */}
        </Routes>
        {/* <>
        {
          
          role == "tender" || "reimbursement" || "dghs" || "outsourcing" ?"":<Footer  />
        }
        </> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
