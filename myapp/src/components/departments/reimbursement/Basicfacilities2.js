import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { AiFillDelete } from 'react-icons/ai'
import ReactToPrint from 'react-to-print'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Basicfacilities2() {

    const [basicfacilities, setbasicfacilities] = useState([])
    const auth = localStorage.getItem("user")
    const [idd, setidd] = useState(JSON.parse(auth)._id)
    const [role, setrole] = useState(null)
    const [name, setname] = useState(JSON.parse(auth).name)
    const [password, setpassword] = useState(JSON.parse(auth).password)
    const [email, setemail] = useState(JSON.parse(auth).email)
    const [Error, setError] = useState("")
    const [bool1, setbool1] = useState(false)
    useEffect(() => {
        getbasicfacilities();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

    const navigate = useNavigate()
    const componentRef = useRef()

    const [Designation, setDesignation] = useState("")
    const [NameOfDept, setNameOfDept] = useState("")
    const [Name, setName] = useState("")
    const [Entitlement, setEntitlement] = useState("")
    const [Disable, setDisable] = useState(false)

    async function handleSearch(event) {
        let key = event.target.value; // key ki value le rhe hai j search bar ,me aayegi
        if (key) { // agar search field me koi value hai to ye niche wala function chalado 
            let result13 = await fetch(`http://localhost:5000/searchBasicFacilities/${key}`); // api hit kar rha hu 
            result13 = await result13.json();
            if (result13) {
                setbasicfacilities(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
            }
        } else {
            getbasicfacilities(); // agar search field empty hai to saare products dikhaado
        }
    }

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
    function isValidEntitlment(Entitlement) {
        return /^[0-9\b]+$/.test(Entitlement);
    }

    const handleEntitlement = event => {
        if (!isValidEntitlment(event.target.value)) {
            setbool1(false);
            if (Entitlement == "")
                setError('');
            else
                setError("Entitlement should only contain numbers");
        } else {
            setError(null);
            setbool1(true);
        }

        setEntitlement(event.target.value);
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

    async function getbasicfacilities() {
        let result6 = await fetch('http://localhost:5000/basicfacilitieslist');// jo jo saare product list hai isme empty array me store honge 
        result6 = await result6.json();// converted to json
        setbasicfacilities(result6);  // setted inside the empty array
        console.log(basicfacilities);
    }

    var total = 0;

    async function collectData() {
        if (bool1) {
            // e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
            let resultt = await fetch('http://localhost:5000/registerbasicfacilities', { // connecting frontend with backend
                method: 'POST',// method post hai
                body: JSON.stringify({ Designation, NameOfDept, Name, Entitlement }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
                // ye name ,email,password wala data backend ki body me jaake store ho rha hai
                headers: {
                    'Content-Type': 'application/json'// ratlo
                }
            });
            resultt = await resultt.json()//converting result to json format
            // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
            // console.log('chanduuuuuuuuuuuuuuuu');
            localStorage.setItem("basicfacility", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
            alert('New Data Created Successfully')
            // console.log("chandu")
            // Navigate('/basicfacilities')
            window.location.reload();
        }
        else {
            alert("please enter correct details first");
            // e.preventDefault()
            navigate('/employeedata');
            // window.location.reload();
            // history.push('/same-page');
        }
    }

    async function deletebasicfacilities(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
        let result8 = await fetch(`http://localhost:5000/basicfacilitieslist/${id}`, { // delete wali api ko call kar rhe hai backend se 
            method: "DELETE"// delete kar rhe hai to method delete hoga
        });
        result8 = await result8.json() // converting to json  
        if (result8) { // agar ache se delete hogya hai to chalao
            getbasicfacilities(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
        }
    }

    // async function enable(id,Designation,NameOfDept,Name,Entitlement) {
    //     // e.preventDefault();
    //     setDisable(false);
    //     setDesignation(Designation);
    //     setNameOfDept(NameOfDept);
    //     setName(Name);
    //     setEntitlement(Entitlement);
    //     console.log('hulk hogan');
    //     console.log(Designation,NameOfDept,Name,Entitlement,Disable);
    //     // console.log(params.id)
    //     let result11 = await fetch(`http://localhost:5000/disableenable/${id}`,{
    //         method:"PUT",
    //         headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
    //         body:JSON.stringify({Designation,NameOfDept,Name,Entitlement,Disable})
    //     });
    //     result11 = await result11.json();
    //     console.log(result11);
    //     // navigate('/basicfacilities2')
    //     // window.location.reload();
    // }

    // async function disable(id,Designation,NameOfDept,Name,Entitlement) {
    //     // e.preventDefault();
    //     setDisable(true);
    //     setDesignation(Designation);
    //     setNameOfDept(NameOfDept);
    //     setName(Name);
    //     setEntitlement(Entitlement);
    //     console.log('hulk hogan');
    //     console.log(Designation,NameOfDept,Name,Entitlement,Disable);
    //     // console.log(params.id)
    //     let result11 = await fetch(`http://localhost:5000/disableenable/${id}`,{
    //         method:"PUT",
    //         headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
    //         body:JSON.stringify({Designation,NameOfDept,Name,Entitlement,Disable})
    //     });
    //     result11 = await result11.json();
    //     console.log(result11);
    //     // navigate('/basicfacilities2')
    //     // window.location.reload();
    // }




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
                                        <input type='text' placeholder='Search product' className='search-product-box' onChange={handleSearch} style={{ backgroundColor: "#212529", width: "fit-content", margin: "auto", color: "white", marginTop: "inherit" }} />
                                        <div class="card-body" ref={componentRef}>
                                            <div class="table-responsive">
                                                <table class="table table-dark table-borderless mb-0 mt-4">
                                                    <thead>


                                                        <tr>
                                                            <th scope="col" className='text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >S.No</th>
                                                            <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}   >Designation</th>
                                                            <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }} >Name of Dept </th>
                                                            <th scope="col" className='text-decoration-underline text-center ' style={{ whiteSpace: "nowrap" }}  >Name</th>
                                                            <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }}  >Entitlement</th>
                                                            <th scope="col" className=' text-decoration-underline text-center' style={{ whiteSpace: "nowrap" }} >Operations</th>
                                                        </tr>


                                                    </thead>
                                                    <tbody>

                                                        {
                                                            basicfacilities.map((item, index) => { total += item.Entitlement }
                                                            )
                                                        }

                                                        {
                                                            basicfacilities.map((item, index) =>
                                                                <tr className='text-center' key={item._id} style={item.Disable ? { color: "darkgoldenrod", filter: "brightness(160%)" } : {}} >

                                                                    <th scope="row" >{index + 1}</th>
                                                                    <td style={{ whiteSpace: "nowrap" }}> {item.Designation}  </td>
                                                                    <td style={{ whiteSpace: "nowrap" }}>{item.NameOfDept}  </td>
                                                                    <td style={{ whiteSpace: "nowrap" }} >{item.Name}  </td>
                                                                    {/* <td style={{ whiteSpace: "nowrap" }}>Rs {item.Entitlement}  </td> */}
                                                                    <td style={{ whiteSpace: "nowrap" }}>Rs {item.Entitlement} </td>
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

                                                                            <Link to={`/updatebasicfacilities/${item._id}`} ><button type="button" class="btn btn-outline-success mx-2 "  >UPDATE</button></Link>
                                                                            <Popup trigger=
                                                                                {<button type="button" class="btn btn-dark btn-md" ><AiFillDelete /></button>}
                                                                                position="top center">
                                                                                <p><strong>Are you sure you want to delete the row ??</strong></p>
                                                                                <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deletebasicfacilities(item._id)} > Yes</button>
                                                                            </Popup>
                                                                            
                                                                            {/* <button type="button" class="btn btn-dark btn-md" onClick={() => deletebasicfacilities(item._id)}><AiFillDelete /></button> */}


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



                                                        <tr><th></th><td></td><td></td><td></td><td class="total">TOTAL- Rs {total}</td><td></td></tr>
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
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation" />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={NameOfDept} onChange={(e) => setNameOfDept(e.target.value)} placeholder="Enter Name of Dept " />
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={Name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name " />
                                                                {/* <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Entitlement} onChange={(e) => setEntitlement(e.target.value)} placeholder="Enter Entitlement " /> */}
                                                                <textarea style={{ border: "solid black" }} class="login-form-input" type="number" value={Entitlement} onChange={handleEntitlement} placeholder="Enter Entitlement only in Numbers " />
                                                                {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={collectData}>Save</button>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>


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
                            <div class="container" >
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
