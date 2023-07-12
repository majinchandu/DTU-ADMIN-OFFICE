import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { Modal } from "react-bootstrap";
import letter from './letter format.docx'
import noting from './noting format.docx'
import { AiFillDelete } from 'react-icons/ai'
import ReactToPrint from 'react-to-print'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import "bootstrap/js/dist/modal";
// import $ from 'jquery'

export default function Dghs() {

  //   const filteredData = useRef([])

  const [dghs, setdghs] = useState([])
  const auth = localStorage.getItem("user")
  const [idd, setidd] = useState(JSON.parse(auth)._id)
  const [role, setrole] = useState(null)
  const [name, setname] = useState(JSON.parse(auth).name)
  const [password, setpassword] = useState(JSON.parse(auth).password)
  const [email, setemail] = useState(JSON.parse(auth).email)

  // const [filteredData, setfilterData] = useState([])
  // const [tenderpopup, settenderpopup] = useState([])
  //   const [showModal, setShowModal] = useState(false);
  //   const [showPopup, setShowPopup] = useState(false);
  const [text, settext] = useState("")

  const componentRef = useRef(null)

  //   useEffect(() => {
  //     if (filteredData.current.length>0) {
  //       setShowPopup(true);
  //       setShowModal(true);
  //       console.log(showModal,showPopup);
  //     }
  //   }, [filteredData])





  // let filteredData = useRef() 
  //   const arr = []
  //   useEffect(() => {
  //     const today = new Date();
  //     console.log(today);
  //     filteredData.current =  tender.filter((row) => {
  //       const rowDate = new Date(row.Contract_Valid_Upto);
  //       console.log(rowDate);

  //       const diffTime = Math.abs(rowDate - today);
  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //       console.log(diffDays);
  //       return diffDays >= 1;
  //     })
  //     console.log(filteredData.current);
  //     if (filteredData.current.length > 0) {
  //       setShowPopup(true);
  //       setShowModal(true);
  //       console.log(showPopup);
  //     }
  //   }, [tender]);


  // async function getpopuptext() {
  //       let result6 = await fetch('http://localhost:5000/tenderpopup');// jo jo saare product list hai isme empty array me store honge 
  //       result6 = await result6.json();// converted to json
  //       settenderpopup(result6);  // setted inside the empty array
  //       settext(result6.text)
  //       console.log(text);
  //   }

  useEffect(() => {

    // getpopuptext();
    getdghs();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    // setShowModal(true);
  }, [])

  // const modalRef = useRef(null);

  const navigate = useNavigate()

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

  async function handleSearch(event) {
    // item.toLowerCase().includes(searchQuery)
    let key = event.target.value; // key ki value le rhe hai j search bar ,me aayegi
    if (key) { // agar search field me koi value hai to ye niche wala function chalado
      let result13 = await fetch(`http://localhost:5000/searchDghs/${key}`); // api hit kar rha hu 
      result13 = await result13.json();
      if (result13) {
        setdghs(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
      }
    } else {
      getdghs(); // agar search field empty hai to saare products dikhaado
    }
  }

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

  const [Name_Of_Official, setName_Of_Official] = useState("")
  const [Designation_Of_Official, setDesignation_Of_Official] = useState("")
  const [Department, setDepartment] = useState("")
  const [Card_No, setCard_No] = useState("")
  const [Date_Of_Issue, setDate_Of_Issue] = useState("")
  const [Remarks, setRemarks] = useState("")

  async function getdghs() {
    let result6 = await fetch('http://localhost:5000/dghslist');// jo jo saare product list hai isme empty array me store honge 
    result6 = await result6.json();// converted to json
    setdghs(result6);  // setted inside the empty array
    console.log(dghs);
  }

  async function deletedghs(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
    let result8 = await fetch(`http://localhost:5000/dghslist/${id}`, { // delete wali api ko call kar rhe hai backend se 
      method: "DELETE"// delete kar rhe hai to method delete hoga
    });
    result8 = await result8.json() // converting to json  
    if (result8) { // agar ache se delete hogya hai to chalao
      getdghs(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
    }
  }

  // function OpenBootstrapPopup() {
  //   // document.getElementById('#simpleModal').modal('show')
  //   $("#simpleModal").modal('show');
  // }

  async function collectData() {
    // e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
    // const date = new Date(validupto);
    // setContract_Valid_Upto(date.toISOString())
    // console.log(Contract_Valid_Upto);
    let resultt = await fetch('http://localhost:5000/registerdghs', { // connecting frontend with backend
      method: 'POST',// method post hai
      body: JSON.stringify({ Name_Of_Official, Designation_Of_Official, Department, Card_No, Date_Of_Issue, Remarks }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
      // ye name ,email,password wala data backend ki body me jaake store ho rha hai
      headers: {
        'Content-Type': 'application/json'// ratlo
      }
    });
    resultt = await resultt.json()//converting result to json format
    // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
    // console.log('chanduuuuuuuuuuuuuuuu');
    localStorage.setItem("dghs", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
    alert('New Data Created Successfully')
    // console.log("chandu")
    // Navigate('/basicfacilities')
    window.location.reload();

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
              <h1 className='jobdescription'>Hello, the job assigned to you is of  {JSON.parse(auth).role} !</h1>
              <div class="row justify-content-center">
                <div class="col-12">
                  <div class="card bg-dark shadow-2-strong chauhansabh">
                    <input type='text' placeholder='Search product' className='search-product-box' onChange={handleSearch} style={{ backgroundColor: "#212529", width: "fit-content", margin: "auto", color: "white", marginTop: "inherit" }} />
                    <div class="card-body" ref={componentRef}>
                      <div class="table-responsive">
                        <table class="table table-dark table-borderless mb-0 mt-4">

                          <thead>


                            <tr>

                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >S No.</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  > Name_Of_Official</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Designation</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Department </th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >Card No.</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >Date of issue</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }} >Remarks</th>

                            </tr>


                          </thead>
                          <tbody>


                            {
                              dghs.map((item, index) =>
                                <tr className='text-center' key={item._id} >

                                  <th scope="row" >{index + 1}</th>
                                  <td style={{ whiteSpace: "pre" }}> {item.Name_Of_Official}  </td>
                                  <td style={{ whiteSpace: "pre" }}>{item.Designation_Of_Official}  </td>
                                  <td style={{ whiteSpace: "pre" }} >{item.Department}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Card_No}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Date_Of_Issue}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Remarks}  </td>

                                  {/* {total+=item.Entitlement} */}
                                  <td>
                                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                                      {/* {
                                                                                item.Disable ? <button type="button" class="btn btn-outline-success" onClick={()=> enable(item._id,item.Designation,item.NameOfDept,item.Name,item.Entitlement)}>ENABLE</button>
                                                                                    :
                                                                                    <>
                                                                                    <Link to={`/updatebasicfacilities/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                                                                    <button type="button" class="btn btn-outline-success " onClick={()=> disable(item._id,item.Designation,item.NameOfDept,item.Name,item.Entitlement)} >DISABLE</button>
                                                                                    </>
                                                                            } */}

                                      <Link to={`/updatedghs/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                      <Popup trigger=
                                        {<button type="button" class="btn btn-dark btn-md" ><AiFillDelete /></button>}
                                        position="top center">
                                        <p><strong>Are you sure you want to delete the row ??</strong></p>
                                        <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deletedghs(item._id)} > Yes</button>
                                      </Popup>
                                      {/* <button type="button" class="btn btn-dark btn-md" onClick={() => deletedghs(item._id)}><AiFillDelete /></button> */}


                                      {/* <Link to={`/updatebasicfacilities/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2">UPDATE</button></Link>
                                                                            <button type="button" class="btn btn-outline-success">DISABLE</button> */}
                                      {/* <div>
                                                                                <Popup trigger=
                                                                                    {<button type="button" class="btn btn-outline-success" >Change Password</button>}
                                                                                    position="top center">
                                                                                    <input type='text' placeholder='Enter New Password' id='nacho' onChange={(e) => setpassword(e.target.value)} />
                                                                                    <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => updateemployee(item._id, item.name, item.email, item.role)} > Set Password</button>
                                                                                </Popup>
                                                                            </div> */}
                                    </div>
                                  </td>
                                </tr>

                              )
                            }



                            {/* <tr><th></th><td></td><td></td><td></td><td class="total">TOTAL- Rs {total}</td><td></td></tr> */}
                          </tbody>
                        </table>
                        {/* <div id='btncontainer' style={{ display: "flex", justifyContent: "right" }}>
                          <button type="button" class="btn btn-danger rounded my-3 w-10 mx-4 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>
                          <ReactToPrint // used to print a component
                            trigger={() => {
                              return <button type="button" class="btn btn-info rounded my-3 w-10 mx-4 ">Print</button>
                            }}
                            content={() => componentRef.current}
                          // documentTitle='new document'
                          // pageStyle="print"
                          />
                          <div className='thors'>
                            <a href={letter} target="_blank" rel="noreferrer"><button type="button" class="btn btn-success rounded my-3 w-10  ">Letter</button></a>
                            <a href={noting} target="_blank" rel="noreferrer" ><button type="button" class="btn btn-success rounded my-3 w-10 mx-2 ">Noting</button></a>
                          </div>

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
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Name_Of_Official} onChange={(e) => setName_Of_Official(e.target.value)} placeholder="Enter Name of Official" />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Designation_Of_Official} onChange={(e) => setDesignation_Of_Official(e.target.value)} placeholder="Enter Designation  " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter Department name " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Card_No} onChange={(e) => setCard_No(e.target.value)} placeholder="Enter Card No. " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Date_Of_Issue} onChange={(e) => setDate_Of_Issue(e.target.value)} placeholder="Enter Date of Issue " />
                                {/* <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Contract_Valid_Upto} onChange={(e) => setContract_Valid_Upto(e.target.value)} placeholder="Enter contact valid upto " /> */}
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter Remarks " />

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
                      <div className='thors'>
                        <a href={letter} target="_blank" rel="noreferrer"><button type="button" class="btn btn-success rounded my-3 w-10  ">Letter</button></a>
                        <a href={noting} target="_blank" rel="noreferrer" ><button type="button" class="btn btn-success rounded my-3 w-10 mx-2 ">Noting</button></a>
                      </div>

                    </div>
                  </div>

                  {/* <div class="btn-group newuserbtn my-3 mx-3" role="group" aria-label="Basic mixed styles example">
                                        <Link to='/signupusingadmin'><button type="button" class="btn btn-danger mx-2">Create New User</button></Link>
                                        <Link to='/assignwork'><button type="button" class="btn btn-danger">Assign Work</button></Link>
                                    </div> */}
                </div>
              </div>
              <div class="modal fade" id="exampleModa0" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      ...
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row ">
                  <div class="col-sm-3">
                    <button onClick={() => roleoutsourcing(idd, name, email, password)} class=" fannekhan btn btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal0" >Outsourcing</button>
                  </div>

                  <div class="col-sm-3" >
                    <button onClick={() => roletender(idd, name, email, password)} class=" fannekhan btn btn-lg active" data-bs-toggle="modal" data-bs-target="#exampleModal1" >Tender</button>
                  </div>

                  <div class="col-sm-3">
                    <button onClick={() => roledghs(idd, name, email, password)} class=" fannekhan btn btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal2" >DGEHS</button>
                  </div>

                  <div class="col-sm-3">
                    <button onClick={() => rolereimbursement(idd, name, email, password)} class=" fannekhan btn btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal3" >Basic facilities</button>
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
