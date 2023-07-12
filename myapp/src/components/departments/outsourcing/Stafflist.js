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

export default function Stafflist() {

    //   const filteredData = useRef([])
    const auth = localStorage.getItem("user")
    const [idd, setidd] = useState(JSON.parse(auth)._id)
    const [role, setrole] = useState(null)
    const [name, setname] = useState(JSON.parse(auth).name)
    const [password, setpassword] = useState(JSON.parse(auth).password)
    const [email, setemail] = useState(JSON.parse(auth).email)

    const [stafflist, setstafflist] = useState([])

    const [text, settext] = useState("")

    const componentRef = useRef(null)



    useEffect(() => {


        getstafflist();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai

    }, [])



    const navigate = useNavigate()

    const [Name_Of_Official, setName_Of_Official] = useState("")
    const [Designation_Of_Official, setDesignation_Of_Official] = useState("")
    const [Department, setDepartment] = useState("")
    const [Father_Husband_Name, setFather_Husband_Name] = useState("")

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
          let result13 = await fetch(`http://localhost:5000/searchStafflist/${key}`); // api hit kar rha hu 
          result13 = await result13.json();
          if (result13) {
            setstafflist(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
          }
        } else {
          getstafflist(); // agar search field empty hai to saare products dikhaado
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

    async function getstafflist() {
        let result6 = await fetch('http://localhost:5000/stafflist');// jo jo saare product list hai isme empty array me store honge 
        result6 = await result6.json();// converted to json
        setstafflist(result6);  // setted inside the empty array
        console.log(stafflist);
    }

    // function OpenBootstrapPopup() {
    //   // document.getElementById('#simpleModal').modal('show')
    //   $("#simpleModal").modal('show');
    // }

    async function deletestafflist(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
        let result8 = await fetch(`http://localhost:5000/stafflist/${id}`, { // delete wali api ko call kar rhe hai backend se 
            method: "DELETE"// delete kar rhe hai to method delete hoga
        });
        result8 = await result8.json() // converting to json  
        if (result8) { // agar ache se delete hogya hai to chalao
            getstafflist(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
        }
    }

    async function collectData() {

        let resultt = await fetch('http://localhost:5000/registerstafflist', { // connecting frontend with backend
            method: 'POST',// method post hai
            body: JSON.stringify({ Name_Of_Official, Designation_Of_Official, Department, Father_Husband_Name }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
            // ye name ,email,password wala data backend ki body me jaake store ho rha hai
            headers: {
                'Content-Type': 'application/json'// ratlo
            }
        });
        resultt = await resultt.json()//converting result to json format
        // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
        // console.log('chanduuuuuuuuuuuuuuuu');
        localStorage.setItem("stafflist", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
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
                <div className='admindata' style={{ height: "auto" }}>
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
                                                            <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  > Name_Of_Official</th>
                                                            <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >Father Name/Husband Name</th>
                                                            <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Designation</th>
                                                            <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Department </th>

                                                        </tr>


                                                    </thead>
                                                    <tbody>


                                                        {
                                                            stafflist.map((item, index) =>
                                                                <tr className='text-center' key={item._id} >

                                                                    <th scope="row" >{index + 1}</th>
                                                                    <td style={{ whiteSpace: "pre" }}> {item.Name_Of_Official}  </td>
                                                                    <td style={{ whiteSpace: "pre" }}> {item.Father_Husband_Name}  </td>
                                                                    <td style={{ whiteSpace: "pre" }}>{item.Designation_Of_Official}  </td>
                                                                    <td style={{ whiteSpace: "pre" }} >{item.Department}  </td>


                                                                    {/* {total+=item.Entitlement} */}
                                                                    <td>
                                                                        <div class="btn-group" role="group" aria-label="Basic outlined example">

                                                                            <Link to={`/updatestafflist/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                                                            <Popup trigger=
                                                                                {<button type="button" class="btn btn-dark btn-md" ><AiFillDelete /></button>}
                                                                                position="top center">
                                                                                <p><strong>Are you sure you want to delete the row ??</strong></p>
                                                                                <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deletestafflist(item._id)} > Yes</button>
                                                                            </Popup>
                                                                            {/* <button type="button" class="btn btn-dark btn-md" onClick={() => deletestafflist(item._id)}><AiFillDelete /></button> */}



                                                                        </div>
                                                                    </td>
                                                                </tr>

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
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Name_Of_Official} onChange={(e) => setName_Of_Official(e.target.value)} placeholder="Enter Name of Official" />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Father_Husband_Name} onChange={(e) => setFather_Husband_Name(e.target.value)} placeholder="Enter name of father or husband  " />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Designation_Of_Official} onChange={(e) => setDesignation_Of_Official(e.target.value)} placeholder="Enter Designation  " />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter Department name " />

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
