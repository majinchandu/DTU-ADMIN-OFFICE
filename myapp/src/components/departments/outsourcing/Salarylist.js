import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import ReactToPrint from 'react-to-print' // used to print a react component 
import { Modal } from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import { ComponentToPrint } from './ComponentToPrint';

// import letter from './letter format.docx'
// import noting from './noting format.docx'
// import "bootstrap/js/dist/modal";
// import $ from 'jquery'

export default function Salarylist() {

  //   const filteredData = useRef([])
  const auth = localStorage.getItem("user")


  const [salarylist, setsalarylist] = useState([])
  const [idd, setidd] = useState(JSON.parse(auth)._id)
  const [role, setrole] = useState(null)
  const [name, setname] = useState(JSON.parse(auth).name)
  const [password, setpassword] = useState(JSON.parse(auth).password)
  const [email, setemail] = useState(JSON.parse(auth).email)
  const [Error, setError] = useState("")
  const [bool1, setbool1] = useState(false)
  const [Error2, setError2] = useState("")
  const [bool2, setbool2] = useState(false)
  const [Error3, setError3] = useState("")
  const [bool3, setbool3] = useState(false)

  const [text, settext] = useState("")

  const componentRef = useRef(null)


  async function handleSearch(event) {
    let key = event.target.value; // key ki value le rhe hai j search bar ,me aayegi
    if (key) { // agar search field me koi value hai to ye niche wala function chalado
      let result13 = await fetch(`http://localhost:5000/searchSalarylist/${key}`); // api hit kar rha hu 
      result13 = await result13.json();
      if (result13) {
        setsalarylist(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
      }
    } else {
      getsalarylist(); // agar search field empty hai to saare products dikhaado
    }
  }

  function isValidPresentSalary(Present_Salary) {
    return /^[0-9\b]+$/.test(Present_Salary);
  }

  const handlePresentSalary = event => {
    if (!isValidPresentSalary(event.target.value)) {
      setbool1(false);
      if (Present_Salary == "")
        setError('');
      else
        setError("Present Salary should only contain numbers");
    } else {
      setError(null);
      setbool1(true);
    }

    setPresent_Salary(event.target.value);
  };


  function isValidTotalDaysInMonth(Total_days_in_months) {
    return /^[0-9\b]+$/.test(Total_days_in_months);
  }

  const handleTotalDaysInMonth = event => {
    if (!isValidTotalDaysInMonth(event.target.value)) {
      setbool2(false);
      if (Total_days_in_months == "")
        setError2('');
      else
        setError2("Total Days In months should contain only numbers");
    } else {
      setError2(null);
      setbool2(true);
    }

    setTotal_days_in_months(event.target.value);
  };

  
  function isValidPayDays(Pay_days) {
    return /^[0-9\b]+$/.test(Pay_days);
  }

  const handlePayDays = event => {
    if (!isValidPayDays(event.target.value)) {
      setbool3(false);
      if (Pay_days == "")
        setError3('');
      else
        setError3("Pay Days  should only contain numbers");
    } else {
      setError3(null);
      setbool3(true);
    }

    setPay_days(event.target.value);
  };
  async function roleoutsourcing(idd, name, email, password) {

    // setrole("tender");
    // console.log(idd,name, password , email ,  "tender");
    let result12 = await fetch(`http://localhost:5000/changeroles/${idd}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name, password, email, role: "outsourcing" })
    });
    result12 = await result12.json()
    console.log(result12);

    logout();
  }
  async function roletender(idd, name, email, password) {

    setrole("tender");
    // console.log(idd,name, password , email ,  "tender");
    let result12 = await fetch(`http://localhost:5000/changeroles/${idd}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name, password, email, role: "tender" })
    });
    result12 = await result12.json()
    console.log(result12);

    logout();
  }

  async function roledghs(idd, name, email, password) {

    // setrole("tender");
    // console.log(idd,name, password , email ,  "tender");
    let result12 = await fetch(`http://localhost:5000/changeroles/${idd}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name, password, email, role: "dghs" })
    });
    result12 = await result12.json()
    console.log(result12);

    logout();
  }

  async function rolereimbursement(idd, name, email, password) {

    // setrole("tender");
    // console.log(idd,name, password , email ,  "tender");
    let result12 = await fetch(`http://localhost:5000/changeroles/${idd}`, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ name, password, email, role: "reimbursement" })
    });
    result12 = await result12.json()
    console.log(result12);

    logout();
  }



  useEffect(() => {


    getsalarylist();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai

  }, [])



  const navigate = useNavigate()

  const [Emp_no, setEmp_no] = useState("")
  const [Name, setName] = useState("")
  const [Gender, setGender] = useState("")
  const [Designation, setDesignation] = useState("")
  const [Present_Salary, setPresent_Salary] = useState("")
  const [Total_days_in_months, setTotal_days_in_months] = useState("")
  const [Pay_days, setPay_days] = useState("")
  const [Fees_for_the_month, setFees_for_the_month] = useState("")
  const [EPF, setEPF] = useState("")
  const [Admn_charges, setAdmn_charges] = useState("")
  const [ESI, setESI] = useState("")
  const [Total_cost_for_DTU, setTotal_cost_for_DTU] = useState("")

  function logout() {

    console.log('chauhan sabh');
    localStorage.clear()
    // Navigate.replace('/employeedata')
    alert("IF YOU ARE CHANGING ROLES , THEN PLS LOGIN AGAIN TO YOUR ACCOUNT AND YOU WILL SEE THE ROLE WHICH YOU CHANGED")
    navigate('/loginemployee')
    window.location.reload();
    // props.success = false;
    // setsuccess3(false);

  }

  async function getsalarylist() {
    let result6 = await fetch('http://localhost:5000/salarylist');// jo jo saare product list hai isme empty array me store honge 
    result6 = await result6.json();// converted to json
    setsalarylist(result6);  // setted inside the empty array
    console.log(salarylist);
  }

  // function OpenBootstrapPopup() {
  //   // document.getElementById('#simpleModal').modal('show')
  //   $("#simpleModal").modal('show');
  // }

  async function deletesalarylist(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
    let result8 = await fetch(`http://localhost:5000/salarylist/${id}`, { // delete wali api ko call kar rhe hai backend se 
      method: "DELETE"// delete kar rhe hai to method delete hoga
    });
    result8 = await result8.json() // converting to json  
    if (result8) { // agar ache se delete hogya hai to chalao
      getsalarylist(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
    }
  }

  async function collectData() {
    console.log(bool1,bool2,bool3);
    if (bool1 && bool2 && bool3 ) {

      let resultt = await fetch('http://localhost:5000/registersalarylist', { // connecting frontend with backend
        method: 'POST',// method post hai
        body: JSON.stringify({ Emp_no, Name, Gender, Designation, Present_Salary, Total_days_in_months, Pay_days, Fees_for_the_month, EPF, Admn_charges, ESI, Total_cost_for_DTU }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
        // ye name ,email,password wala data backend ki body me jaake store ho rha hai
        headers: {
          'Content-Type': 'application/json'// ratlo
        }
      });
      resultt = await resultt.json()//converting result to json format
      // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
      // console.log('chanduuuuuuuuuuuuuuuu');
      localStorage.setItem("salarylist", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
      alert('New Data Created Successfully')
      // console.log("chandu")
      // Navigate('/basicfacilities')
      window.location.reload();
    } else {
      alert(`please enter correct details first:  ${Error,Error2,Error3}`);
      // e.preventDefault()
      navigate('/outsourceStaffSalary');
      // window.location.reload();
      // history.push('/same-page');
    }

  }


  //  async function updatepopup(idd) {

  //       let result11 = await fetch(`http://localhost:5000/updatepopup/${idd}`, {
  //           method: "PUT",
  //           headers: { "Content-type": "application/json; charset=UTF-8" },
  //           body: JSON.stringify({text })
  //       });
  //       result11 = await result11.json()
  //       console.log(result11);
  //       // navigate('/')
  //       alert('POPUP updated  Succesfully ')
  //       window.location.reload();
  //       // Navigate('/basicfacilities')
  //   }

  return (
    <div className='basicfacilities2' style={{
      overflowY: "auto",
      height: "calc(100% - 30px)"
    }}>
      <section class="intro">
        <div className='admindata' style={{ height: "auto" }} >
          <div class="mask d-flex align-items-center h-100" style={{
            backgroundColor: "rgba(0,0,0,.25)", margin: "0",
            padding: "0",
            paddingTop: "50vh",
            paddingBottom: "50vh"
          }}>
            <div class="container" style={{ animation: "1s ease-out 0s 1 slideInFromLeft" }}>
              {/* <h1 className='jobdescription'>Hello, the job assigned to you is of  {JSON.parse(auth).role} !</h1> */}
              <div class="row justify-content-center">
                <div class="col-12">
                  <div class="card bg-dark shadow-2-strong chauhansabh">
                  <input type='text' placeholder='Search product' className='search-product-box' onChange={handleSearch} style={{    backgroundColor:"#212529",width: "fit-content",margin: "auto",color: "white",marginTop: "inherit"}} />
                    <div class="card-body" ref={componentRef} >
                      <div class="table-responsive">
                        <table class="table table-dark table-borderless mb-0 mt-4">
                          <thead>


                            <tr>

                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >S No.</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >EMP No.</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  > Name</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >Gender</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Designation</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Present_Salary </th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >Total days in months.</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >Pay days</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  > Fees for the month</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >EPF( 12% of Rs:15000 PM)</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Admn charges (1%)</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >ESI(3.25% of ypto Rs:25000) </th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Total Cost of DTU </th>



                            </tr>


                          </thead>
                          <tbody>


                            {
                              salarylist.map((item, index) =>
                                <>
                                  <script>
                                    {

                                      item.Fees_for_the_month = Math.round(((item.Present_Salary / item.Total_days_in_months) * item.Pay_days))

                                    }

                                    {

                                      item.EPF = Math.round(15000 * 0.12)

                                    }
                                    {

                                      item.Admn_charges = Math.round(0.01 * 15000)

                                    }
                                    {

                                      item.ESI = Math.round(0.0325 * item.Fees_for_the_month)

                                    }
                                    {

                                      item.Total_cost_for_DTU = Math.round(item.Fees_for_the_month + item.EPF + item.Admn_charges + item.ESI)

                                    }
                                  </script>

                                  <tr className='text-center' key={item._id} >
                                    <th scope="row" >{index + 1}</th>
                                    <td style={{ whiteSpace: "pre" }}> {item.Emp_no}  </td>
                                    <td style={{ whiteSpace: "pre" }}> {item.Name}  </td>
                                    <td style={{ whiteSpace: "pre" }}>{item.Gender}  </td>
                                    <td style={{ whiteSpace: "pre" }} >{item.Designation}  </td>
                                    <td style={{ whiteSpace: "pre" }}> Rs:{item.Present_Salary}  </td>
                                    <td style={{ whiteSpace: "pre" }}> {item.Total_days_in_months}  </td>
                                    <td style={{ whiteSpace: "pre" }}>{item.Pay_days}  </td>
                                    <td style={{ whiteSpace: "pre" }} >Rs:{item.Fees_for_the_month}  </td>
                                    <td style={{ whiteSpace: "pre" }}> Rs:{item.EPF}  </td>
                                    <td style={{ whiteSpace: "pre" }}> Rs:{item.Admn_charges}  </td>
                                    <td style={{ whiteSpace: "pre" }}>Rs:{item.ESI}  </td>
                                    <td style={{ whiteSpace: "pre" }} >Rs:{item.Total_cost_for_DTU}  </td>


                                    {/* {total+=item.Entitlement} */}
                                    <td>
                                      <div class="btn-group" role="group" aria-label="Basic outlined example">

                                        <Link to={`/updatesalarylist/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                        <Popup trigger=
                                          {<button type="button" class="btn btn-dark btn-md" ><AiFillDelete /></button>}
                                          position="top center">
                                          <p><strong>Are you sure you want to delete the row ??</strong></p>
                                          <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deletesalarylist(item._id)} > Yes</button>
                                        </Popup>
                                        {/* <button type="button" class="btn btn-dark btn-md" onClick={() => deletesalarylist(item._id)}><AiFillDelete /></button> */}



                                      </div>
                                    </td>
                                  </tr>

                                </>

                              )
                            }

                          </tbody>
                        </table>
                        {/* <div id='btncontainer' style={{ display: "flex", justifyContent: "right" }}>
                                                    <button type="button" class="btn btn-danger rounded my-3 w-10 mx-4 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>

                                                    <ReactToPrint // used to print a component
                                                        trigger={() => {
                                                            return  <button type="button" class="btn btn-info rounded my-3 w-10 mx-4 ">Print</button>
                                                        }}
                                                        content={() => this.componentRef}
                                                        documentTitle='new document'
                                                        pageStyle="print"
                                                    />


                                                </div> */}

                        <div class="modal fade" id="myModall" role="dialog" >
                          <div class="modal-dialog modal-dialog-centered" >

                            {/* NEW DATA */}

                            <div class="modal-content" style={{ backgroundColor: "#c4afaf" }}  >
                              <div class="modal-header">
                                <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }} >New Data</h1>
                                <button type="button" class="close" data-bs-dismiss="modal" style={{ border: "none" }}>{<ImCross />}</button>
                              </div>
                              <div class="modal-body">
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Emp_no} onChange={(e) => setEmp_no(e.target.value)} placeholder="Enter enployee no." />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter name of employee  " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Gender} onChange={(e) => setGender(e.target.value)} placeholder="Enter Gender  " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Present_Salary} onChange={handlePresentSalary} placeholder="Enter Present Salary " />
                                {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Total_days_in_months} onChange={handleTotalDaysInMonth} placeholder="Enter total days in month  " />
                                {Error2 && <h7 style={{ color: 'red' }}>{Error2}</h7>}
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Pay_days} onChange={handlePayDays} placeholder="Enter pay days  " />
                                {Error3 && <h7 style={{ color: 'red' }}>{Error3}</h7>}
                                {/* <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Fees_for_the_month} onChange={(e) => setFees_for_the_month(e.target.value)} placeholder="Enter Fees for the month" />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={EPF} onChange={(e) => setEPF(e.target.value)} placeholder="Enter EPF" />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Admn_charges} onChange={(e) => setAdmn_charges(e.target.value)} placeholder="Enter Admn Charges  " />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={ESI} onChange={(e) => setESI(e.target.value)} placeholder="Enter ESI  " />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Total_cost_for_DTU} onChange={(e) => setTotal_cost_for_DTU(e.target.value)} placeholder="Enter Total cost for DTU " /> */}

                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={collectData}  >Save</button>
                              </div>
                            </div>



                          </div>
                        </div>

                        {/* POPUP */}
                        {/* {
                          console.log(filteredData.current.Name_Of_Allotment)
                          
                        } */}





                        {/* <Modal show={showModal}  >
                              <Modal.Header closeButton = {showModal} style={{ overflowX: "auto" }} onClick={()=>setShowModal(false)} >
                                <Modal.Title> <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto", whiteSpace: "pre", "fontSize": "20px" }} >Alert! Tender is about to expire for these fields</h1>
                                </Modal.Title>
                              </Modal.Header>
                              {
                              filteredData.current.map((item, index) =>
                              <Modal.Body>
                                <h2 style={{whiteSpace:"pre-line"}}> {item.Name_Of_Allotment} </h2>
                              </Modal.Body>
                              )
                            }
                            </Modal> */}



                        {/* { showPopup && <Popup fieldName={filteredData.current[0].Allotee_name} />} */}

                        {/* POPUP ENDS */}

                      </div>

                    </div>
                    <div id='btncontainer' style={{ display: "flex", justifyContent: "right" }}>
                      <button type="button" class="btn btn-danger rounded my-3 w-10 mx-4 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>

                      <ReactToPrint // used to print a component
                        trigger={() => {
                          return <button type="button" class="btn btn-info rounded my-3 w-10 mx-4 ">Print</button>
                        }}
                        content={() => componentRef.current}
                      // documentTitle='new document'
                      // pageStyle="print"
                      />


                    </div>
                  </div>
                  {/* <div class="btn-group newuserbtn my-3 mx-3" role="group" aria-label="Basic mixed styles example">
                                        <Link to='/signupusingadmin'><button type="button" class="btn btn-danger mx-2">Create New User</button></Link>
                                        <Link to='/assignwork'><button type="button" class="btn btn-danger">Assign Work</button></Link>
                                    </div> */}

                </div>
              </div>
              <div class="container">
                <div class="row ">
                  <div class="col-sm-3">
                    <button onClick={() => roleoutsourcing(idd, name, email, password)} class=" fannekhan btn btn-lg">Outsourcing</button>
                  </div>

                  <div class="col-sm-3" >
                    <button onClick={() => roletender(idd, name, email, password)} class=" fannekhan btn btn-lg active">Tender</button>
                  </div>

                  <div class="col-sm-3">
                    <button onClick={() => roledghs(idd, name, email, password)} class=" fannekhan btn btn-lg">DGEHS</button>
                  </div>

                  <div class="col-sm-3">
                    <button onClick={() => rolereimbursement(idd, name, email, password)} class=" fannekhan btn btn-lg">Basic facilities</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
