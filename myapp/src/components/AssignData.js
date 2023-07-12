import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

// export const workvalue=""
// const  [workvalue, setworkvalue] = useState("")
export default function AssignData(props) {

    const [employees, setemployees] = useState([])
    // const  [workvalue, setworkvalue] = useState("")
    const params = useParams(); // used to extract parameters from url to code ,, abhi params me pure product ka data hai jiski id pass ki gyi hai
    const [role, setrole] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [selectedOption, setSelectedOption] = useState('Select an option');
    const Navigate = useNavigate();
    const [value, setValue] = useState();
    // const [alertDGHS, setalertDGHS] = useState(false)
    // const [alertOUTSOURICNG, setalertOUTSOURICNG] = useState(false)
    // const [alertBASICFACILITIES, setalertBASICFACILITIES] = useState(false)
    // const [alertTENDER, setalertTENDER] = useState(false)

    // const refresh = ()=>{
    //     // re-renders the component
    //     setValue({});
    // }

    // let role;
    useEffect(() => {
        getemployees();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    async function getemployees() {
        let result6 = await fetch('http://localhost:5000/employeeslist');// jo jo saare product list hai isme empty array me store honge 
        result6 = await result6.json();// converted to json
        setemployees(result6);  // setted inside the empty array
        console.log(employees);
    }


    // async function updateemployee(idd, name, password, email) {

    //     setname(name);
    //     setpassword(password);
    //     setemail(email);

    //     let result11 = await fetch(`http://localhost:5000/employeeslist/${idd}`, {
    //         method: "PUT",
    //         headers: { "Content-type": "application/json; charset=UTF-8" },
    //         body: JSON.stringify({ name, password, email, role })
    //     });
    //     result11 = await result11.json()
    //     console.log(result11);
    //     // navigate('/')
    // }




    function savechanges() {
        // alert('Work Asisgned Succesfully ')
        Navigate('/admindata')
    }

    async function Setreimbursement(_id, name, password, email, role) {
        // setrole("reimbursement");
        setSelectedOption("reimbursement")
        console.log(role);
        setname(name);
        setpassword(password);
        setemail(email);

        let result11 = await fetch(`http://localhost:5000/employeeslist/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ name, password, email, role })
        });
        result11 = await result11.json()
        console.log(result11);
        window.location.reload()
        //  updateemployee(_id, name, password, email);
        // return;
        // setSelectedOption("reimbursement")
        // setrole("reimbursement")
        // setalertBASICFACILITIES(true);
        // setalertDGHS(false);
        // setalertOUTSOURICNG(false);
        // setalertTENDER(false);
    }


    async function Setender(_id, name, password, email, role) {
        //  setrole("tender");
        setSelectedOption("tender")
        console.log(role);
        setname(name);
        setpassword(password);
        setemail(email);

        let result11 = await fetch(`http://localhost:5000/employeeslist/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ name, password, email, role })
        });
        result11 = await result11.json()
        console.log(result11);
        window.location.reload()
        //    updateemployee(_id, name, password, email);
        //    return;
        // setSelectedOption("tender")
        // setrole("tender")
        // setalertBASICFACILITIES(false);
        // setalertDGHS(false);
        // setalertOUTSOURICNG(false);
        // setalertTENDER(true);
    }


    async function Setdghs(_id, name, password, email, role) {
        // setrole("dghs");
        setSelectedOption("dghs")
        console.log(role);
        setname(name);
        setpassword(password);
        setemail(email);

        let result11 = await fetch(`http://localhost:5000/employeeslist/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ name, password, email, role })
        });
        result11 = await result11.json()
        console.log(result11);
        window.location.reload()
        //  updateemployee(_id, name, password, email);
        // return;
        // setSelectedOption("dghs")
        // setrole("dghs")
        // setalertBASICFACILITIES(false);
        // setalertDGHS(true);
        // setalertOUTSOURICNG(false);
        // setalertTENDER(false);
    }

    async function Setoutsourcing(_id, name, password, email, role) {
        // setrole("outsourcing");
        setSelectedOption("outsourcing")
        console.log(role);
        setname(name);
        setpassword(password);
        setemail(email);

        let result11 = await fetch(`http://localhost:5000/employeeslist/${_id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ name, password, email, role })
        });
        result11 = await result11.json()
        console.log(result11);
        window.location.reload()
        //  updateemployee(_id, name, password, email);
        // return ;
        // setSelectedOption("outsourcing")
        // setrole("outsourcing")
        // setalertBASICFACILITIES(false);
        // setalertDGHS(false);
        // setalertOUTSOURICNG(true);
        // setalertTENDER(false);
    }



    return (
        < section class="intro" >
            {/* <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </symbol>
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
            </svg> */}
            <div className='assignwork' style={{ height: "auto" }}>
                <div class="mask d-flex align-items-center h-100" style={{
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
                                                        <th scope="col-1" className='text-decoration-underline text-center'>S.No</th>
                                                        <th scope="col-3" className=' text-decoration-underline text-center '>NAME</th>
                                                        <th scope="col-8" className='text-decoration-underline text-center '>ASSIGN WORK</th>
                                                        <th scope='col-1' ></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        employees.map((item, index) =>
                                                            <tr key={item._id} >
                                                                <th scope="row" className=' text-center' >{index + 1}</th>
                                                                <td className=' text-center' >{item.name}</td>
                                                                {/* <td className=' text-center'><input class="assignworkinputfield " type="text"  name="assignwork" placeholder="work" required onChange={(e) => setrole(e.target.value)} /></td> */}
                                                                <td className=' text-center'>
                                                                    {/* <div class=" dropend   ">
                                                                        <button class="btn btn-sm btn-secondary dropdown-toggle   " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            Dropdown button
                                                                        </button>
                                                                        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-right ">
                                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                                                                        </ul>
                                                                    </div>*/}
                                                                    <div class="btn-group dropend  ">
                                                                        <button type="button" class="btn  btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            {item.role}
                                                                        </button>
                                                                        <ul class="dropdown-menu">
                                                                            {/* <li class="dropdown-item" onSelect={() => handleOptionSelect('reimbursement')} onClick={(e) => setrole('reimbursement')}  >reimbursement</li>
                                                                            <li class="dropdown-item" onSelect={() => handleOptionSelect('outsourcing')} onClick={(e) => setrole('outsourcing')} >outsourcing</li>
                                                                            <li class="dropdown-item" onSelect={() => handleOptionSelect('tender')} onClick={(e) => setrole('tender')} >tender</li>
                                                                            <li class="dropdown-item" onSelect={() => handleOptionSelect('dghs ')} onClick={(e) => setrole('tender')} >dghs</li> */}
                                                                            <li class="dropdown-item" onClick={() => Setreimbursement(item._id, item.name, item.password, item.email, "reimbursement")}  >reimbursement</li>
                                                                            <li class="dropdown-item" onClick={() => Setoutsourcing(item._id, item.name, item.password, item.email, "outsourcing")}  >outsourcing</li>
                                                                            <li class="dropdown-item" onClick={() => Setender(item._id, item.name, item.password, item.email, "tender")}  >tender</li>
                                                                            <li class="dropdown-item" onClick={() => Setdghs(item._id, item.name, item.password, item.email, "dghs")} >dghs</li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                {/* <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{ borderColor: "white" }} onClick={() => updateemployee(item._id, item.name, item.password, item.email)} /><label class="form-check-label" for="flexCheckChecked"></label></td> */}
                                                            </tr>
                                                        )
                                                    }
                                                    {/* onClick={updateemployee(item._id)} */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button type="button" class="btn btn-sm rounded btn-danger right " onClick={savechanges}>Go Back</button>
                                        {/* <p style={{ color: "yellow", fontSize: "13px" }} className='my-4' >[please check each box after assigning the work to corresponding employee]</p>
                                        <p style={{ color: "yellow", fontSize: "13px" }}>Works an admin can assign :-</p>
                                        <ul style={{ color: "yellow", fontSize: "13px" }}>
                                            <li> reimbursement </li>
                                            <li> outsourcing </li>
                                            <li> tender </li>
                                            <li> dghs </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}
