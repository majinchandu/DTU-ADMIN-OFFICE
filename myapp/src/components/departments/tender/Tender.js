import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { Modal } from "react-bootstrap";
import { AiFillDelete } from 'react-icons/ai'
import ReactToPrint from 'react-to-print'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import "bootstrap/js/dist/modal";
// import $ from 'jquery'



export default function Tender() {

  const filteredData = useRef([])

  const auth = localStorage.getItem("user")
  const [idd, setidd] = useState(JSON.parse(auth)._id)
  const [role, setrole] = useState(null)
  const [name, setname] = useState(JSON.parse(auth).name)
  const [password, setpassword] = useState(JSON.parse(auth).password)
  const [email, setemail] = useState(JSON.parse(auth).email)

  const [tender, settender] = useState([])
  // const [filteredData, setfilterData] = useState([])
  // const [tenderpopup, settenderpopup] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [text, settext] = useState("")
  const [Error, setError] = useState("")
  const [bool1, setbool1] = useState(false)

  const componentRef = useRef(null)


  useEffect(() => {
    if (filteredData.current.length > 0) {
      setShowPopup(true);
      setShowModal(true);
      console.log(showModal, showPopup);
    }
  }, [filteredData])



  // let filteredData = useRef() 
  const arr = []
  useEffect(() => {
    const today = new Date();
    console.log(today);
    filteredData.current = tender.filter((row) => {
      const rowDate = new Date(row.Contract_Valid_Upto);
      console.log(rowDate);

      const diffTime = Math.abs(rowDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // const diffInDays = (today - rowDate) / (1000 * 60 * 60 * 24);
      console.log(diffDays);
      // return diffDays >= 1;
      return diffDays <= 90;
    })
    // Object.keys(filteredData).forEach(key => arr.push({name: key, value: filteredData[key]}))
    console.log(filteredData.current);
    if (filteredData.current.length > 0) {
      setShowPopup(true);
      setShowModal(true);
      console.log(showPopup);
    }
  }, [tender]);


  // async function getpopuptext() {
  //       let result6 = await fetch('http://localhost:5000/tenderpopup');// jo jo saare product list hai isme empty array me store honge 
  //       result6 = await result6.json();// converted to json
  //       settenderpopup(result6);  // setted inside the empty array
  //       settext(result6.text)
  //       console.log(text);
  //   }

  useEffect(() => {

    // getpopuptext();
    gettender();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    // setShowModal(true);
  }, [])

  // const modalRef = useRef(null);

  const navigate = useNavigate()

  const [File_No, setFile_No] = useState("")
  const [Name_Of_Allotment, setName_Of_Allotment] = useState("")
  const [Allotee_name, setAllotee_name] = useState("")
  const [Vendor_Contact_No, setVendor_Contact_No] = useState("")
  const [Date_Of_Award_Of_Contract, setDate_Of_Award_Of_Contract] = useState("")
  const [Contract_Valid_Upto, setContract_Valid_Upto] = useState("")
  const [validupto, setvalidupto] = useState("")
  const [Remarks, setRemarks] = useState("")
// /(19|20)\d\d$[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])/
  function isValidContract_Valid_Upto(Contract_Valid_Upto) {
    return  /^(19|20\d\d)[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/.test(Contract_Valid_Upto);
  }
  // ^(19|20)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])\d\d$
  const handleContract_Valid_Upto = event => {
    if (!isValidContract_Valid_Upto(event.target.value)) {
      setbool1(false);
      if (Contract_Valid_Upto == "")
        setError('');
      else
        setError("Please Follow Correct format for the Date of Contract Valid Upto ");
    } else {
      setError(null);
      setbool1(true);
    }

    setContract_Valid_Upto(event.target.value);
  };

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
    let key = event.target.value; // key ki value le rhe hai j search bar ,me aayegi
    if (key) { // agar search field me koi value hai to ye niche wala function chalado
      let result13 = await fetch(`http://localhost:5000/searchTender/${key}`); // api hit kar rha hu 
      result13 = await result13.json();
      if (result13) {
        settender(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
      }
    } else {
      gettender(); // agar search field empty hai to saare products dikhaado
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

  async function gettender() {
    let result6 = await fetch('http://localhost:5000/tenderlist');// jo jo saare product list hai isme empty array me store honge 
    result6 = await result6.json();// converted to json
    settender(result6);  // setted inside the empty array
    console.log(tender);
  }

  async function deletetender(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
    let result8 = await fetch(`http://localhost:5000/tenderlist/${id}`, { // delete wali api ko call kar rhe hai backend se 
      method: "DELETE"// delete kar rhe hai to method delete hoga
    });
    result8 = await result8.json() // converting to json  
    if (result8) { // agar ache se delete hogya hai to chalao
      gettender(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
    }
  }

  // 2023-04-10T12:30:00.000+00:00


  // function OpenBootstrapPopup() {
  //   // document.getElementById('#simpleModal').modal('show')
  //   $("#simpleModal").modal('show');
  // }

  async function collectData() {
    // e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
    // const date = new Date(validupto);
    // setContract_Valid_Upto(date.toISOString())
    // console.log(Contract_Valid_Upto);
    if (bool1) {
      setContract_Valid_Upto(Contract_Valid_Upto + "T12:30:00.000+00:00");
      console.log(Contract_Valid_Upto);


      let resultt = await fetch('http://localhost:5000/registertender', { // connecting frontend with backend
        method: 'POST',// method post hai
        body: JSON.stringify({ File_No, Name_Of_Allotment, Allotee_name, Vendor_Contact_No, Date_Of_Award_Of_Contract, Contract_Valid_Upto, Remarks }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
        // ye name ,email,password wala data backend ki body me jaake store ho rha hai
        headers: {
          'Content-Type': 'application/json'// ratlo
        }
      });
      resultt = await resultt.json()//converting result to json format
      // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
      // console.log('chanduuuuuuuuuuuuuuuu');
      localStorage.setItem("tender", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
      alert('New Data Created Successfully')
      // console.log("chandu")
      // Navigate('/basicfacilities')
      window.location.reload();

      const substring = Contract_Valid_Upto.substring(0, 10)

    }

    else {
      alert(`please enter correct details first:  ${Error}`);
      // e.preventDefault()
      navigate('/employeedata');
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
        <div className='admindata' style={{ height: "auto" }}>
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
                  {/* <input type='text' placeholder='Search product' className='search-product-box' onChange={handleSearch} style={{    backgroundColor:"#212529",width: "fit-content",margin: "auto",color: "white",marginTop: "inherit"}} /> */}
                    <div class="card-body" ref={componentRef} >
                      <div class="table-responsive">
                        <table class="table table-dark table-borderless mb-0 mt-4">
                          <thead>


                            <tr>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >S No.</th>
                              <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >File No.</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Name Of Allotment</th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Allotee's Name </th>
                              <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >Vendor's Contact No</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >Date Of Award Of Contract</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }} >Contract Valid Upto</th>
                              <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }} >Remarks</th>

                            </tr>


                          </thead>
                          <tbody>


                            {
                              tender.map((item, index) =>
                                <tr className='text-center' key={item._id} >

                                  <th scope="row" >{index + 1}</th>
                                  <td style={{ whiteSpace: "pre" }}> {item.File_No}  </td>
                                  <td style={{ whiteSpace: "pre" }}>{item.Name_Of_Allotment}  </td>
                                  <td style={{ whiteSpace: "pre" }} >{item.Allotee_name}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Vendor_Contact_No}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Date_Of_Award_Of_Contract}  </td>
                                  <td style={{ whiteSpace: "pre" }}> {item.Contract_Valid_Upto.substring(0, 10)}</td>
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

                                      <Link to={`/updatetender/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                      <Popup trigger=
                                        {<button type="button" class="btn btn-dark btn-md" ><AiFillDelete /></button>}
                                        position="top center">
                                        <p><strong>Are you sure you want to delete the row ??</strong></p>
                                        <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deletetender(item._id)} > Yes</button>
                                      </Popup>
                                      {/* <button type="button" class="btn btn-dark btn-md" onClick={() => deletetender(item._id)}><AiFillDelete /></button> */}



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
                        {/* <div id='btncontainer'>
                          <button type="button" class="btn btn-danger rounded my-3 w-10 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>
                          <ReactToPrint // used to print a component
                            trigger={() => {
                              return <button type="button" class="btn btn-info rounded my-3 w-10 mx-4 ">Print</button>
                            }}
                            content={() => componentRef.current}
                          // documentTitle='new document'
                          // pageStyle="print"
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
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={File_No} onChange={(e) => setFile_No(e.target.value)} placeholder="Enter File No." />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Name_Of_Allotment} onChange={(e) => setName_Of_Allotment(e.target.value)} placeholder="Enter name of allotment " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Allotee_name} onChange={(e) => setAllotee_name(e.target.value)} placeholder="Enter Allotee's name " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Vendor_Contact_No} onChange={(e) => setVendor_Contact_No(e.target.value)} placeholder="Enter Vendor Contact No. " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Date_Of_Award_Of_Contract} onChange={(e) => setDate_Of_Award_Of_Contract(e.target.value)} placeholder="Enter Date of award Of contact " />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Contract_Valid_Upto} onChange={handleContract_Valid_Upto} placeholder="Enter contact valid upto in format (YYYY-MM-DD) only " />
                                {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Enter Remarks " />

                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={collectData}  >Save</button>
                              </div>
                            </div>



                          </div>
                        </div>

                        {/* POPUP */}
                        {
                          console.log(filteredData.current.Name_Of_Allotment)

                        }





                        <Modal show={showModal}  >
                          <Modal.Header closeButton={showModal} style={{ overflowX: "auto" }} onClick={() => setShowModal(false)} >
                            <Modal.Title> <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto", whiteSpace: "pre", "fontSize": "20px" }} >Alert! Tender is about to expire for these fields</h1>
                            </Modal.Title>
                          </Modal.Header>
                          {
                            filteredData.current.map((item, index) =>
                              <Modal.Body>
                                {/* <textarea style={{ border: "solid black", width: "-webkit-fill-available" }} class="" rows='5' type="text" value={text} onChange={(e) => settext(e.target.value)} placeholder="Enter text ." /> */}
                                <h2 style={{ whiteSpace: "pre-line" }}> {item.Name_Of_Allotment} </h2>
                              </Modal.Body>
                            )
                          }
                        </Modal>



                        {/* { showPopup && <Popup fieldName={filteredData.current[0].Allotee_name} />} */}

                        {/* POPUP ENDS */}

                      </div>
                    </div>
                    <div id='btncontainer'>
                      <button type="button" class="btn btn-danger rounded my-3 w-10 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>
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
