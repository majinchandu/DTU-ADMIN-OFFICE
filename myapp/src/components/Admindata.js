import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactModal from 'react-modal';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PWDRequisite from './PWDRequisite';

export default function Admindata(props) {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [email, setemail] = useState("")
  const [role, setrole] = useState("")
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [pwdRequiste, setPWDRquisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const handleOnChange = (e) => {
    setpassword(e.target.value);
  };

  const handleOnFocus = () => {
    setPWDRquisite(true);
  };

  const handleOnBlur = () => {
    setPWDRquisite(false);
  };

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };



  const [employees, setemployees] = useState([])
  useEffect(() => {
    getemployees();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
  }, [])

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };


  async function getemployees() {
    let result6 = await fetch('http://localhost:5000/employeeslist');// jo jo saare product list hai isme empty array me store honge 
    result6 = await result6.json();// converted to json
    setemployees(result6);  // setted inside the empty array
    console.log(employees);
  }


  async function updateemployee(idd, name, email, role) {
    if ((checks.capsLetterCheck && 
      checks.numberCheck &&
      checks.pwdLengthCheck &&
      checks.specialCharCheck ) ){
      
        setname(name);
        // setpassword(password);
        setemail(email);
        setrole(role)
        let result12 = await fetch(`http://localhost:5000/employeeslist/${idd}`, {
          method: "PUT",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ name, password, email, role })
        });
        result12 = await result12.json()
        console.log(result12);
        alert('password setted successfully')
        window.location.reload();

    } else {
      alert("please enter correct details first");
            // e.preventDefault()
    }
    // console.log(name,price,company,category);
  }
  
  
  async function deleteemployee(id) { //* ye id paramter ki tarah aayegi jahan call hua hai
    let result8 = await fetch(`http://localhost:5000/employeeslist/${id}`, { // delete wali api ko call kar rhe hai backend se 
      method: "DELETE"// delete kar rhe hai to method delete hoga
    });
    result8 = await result8.json() // converting to json  
    if (result8) { // agar ache se delete hogya hai to chalao
      getemployees(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
    }
  }

  //   {
  //     products.length >0 ?  products.map((item, index) => // agar koi ek bhi product hai to chalao
  //       <ul key={item._id}>
  //         <li>{index + 1}</li>
  //         <li>{item.name}</li>
  //         <li>{item.price}</li>
  //         <li>{item.category}</li>
  //         <li>{item.company}</li>
  //         <li>
  //           <button onClick={() => deleteProduct(item._id)}>Delete</button>
  //           <Link to={`/update/${item._id}`}>Update</Link>{/* id is given as a parameter of which product to be updated */}
  //         </li> {/* item._id ko delete kar rhe hai jo product ki id hogi  */}
  //       </ul>
  //     )
  //     :
  //     <h1>No products found</h1> // agar search karte waqt koi aisi string daaldi jo mil nhi rhi products me to ye show kardo
  //   }


  return (
    <section class="intro">
      <div className='admindata' style={{ height: "auto" }} >
        <div class="mask d-flex align-items-center" style={{
          backgroundColor: "rgba(0,0,0,.25)", margin: "0",
          padding: "0",
          paddingTop: "50vh",
          paddingBottom: "50vh"
        }}>
          <div class="container" style={{ animation: "1s ease-out 0s 1 slideInFromLeft" }}>
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="card bg-dark shadow-2-strong chauhansabh">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-dark table-borderless mb-0 mt-4">
                        <thead>
                          <tr>
                            <th scope="col" className='text-decoration-underline text-center'>S.No</th>
                            <th scope="col" className=' text-decoration-underline text-center'>NAME</th>
                            <th scope="col" className='text-decoration-underline text-center'>ROLE</th>
                            <th scope="col" className=' text-decoration-underline text-center'>EMAIL</th>
                            <th scope="col" className=' text-decoration-underline text-center'>PASSWORD</th>
                            <th scope="col" className=' text-decoration-underline text-center'>OPERATIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            employees.map((item, index) =>
                              <tr className='text-center' key={item._id} >
                                <th scope="row" >{index + 1}</th>
                                <td  >{item.name}</td>
                                <td  >{item.role}</td>
                                <td  >{item.email}</td>
                                <td >{item.password}</td>
                                <td >
                                  <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    {/* <button type="button" class="btn btn-outline-success" onClick={() => deleteemployee(item._id)}>DELETE</button> */}
                                    <Popup trigger=
                                      {<button type="button" class="btn btn-outline-success" >DELETE</button>}
                                      position="top center">
                                      <p><strong>Are you sure you want to delete the row ??</strong></p>
                                      <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => deleteemployee(item._id)} > Yes</button>
                                    </Popup>
                                    <div>
                                      <Popup trigger=
                                        {<button type="button" class="btn btn-outline-success" >Change Password</button>}
                                        position="top center">
                                        {/* <input type='text' placeholder='Enter New Password' id='nacho' onChange={(e) => setpassword(e.target.value)} /> */}
                                        <input type='text' value={password} placeholder='Enter New Password' id='nacho' onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} onKeyUp={handleOnKeyUp} />
                                        {pwdRequiste ? (
                                          <PWDRequisite
                                            capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                            numberFlag={checks.numberCheck ? "valid" : "invalid"}
                                            pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                            specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
                                          />
                                        ) : null}
                                        <button className='btn btn-dark btn-sm my-1 rounded' style={{ borderRadius: "80px" }} onClick={() => updateemployee(item._id, item.name, item.email, item.role)} > Set Password</button>
                                      </Popup>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="btn-group newuserbtn my-3 mx-3" role="group" aria-label="Basic mixed styles example">
                  <Link to='/signupusingadmin'><button type="button" class="btn btn-danger mx-2">Create New User</button></Link>
                  <Link to='/assignwork'><button type="button" class="btn btn-danger">Assign Work</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
