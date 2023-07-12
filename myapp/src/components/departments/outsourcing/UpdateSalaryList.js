import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdateSalaryList() {

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
    const [Error, setError] = useState("")
    const [bool1, setbool1] = useState(true)
    const [Error2, setError2] = useState("")
    const [bool2, setbool2] = useState(true)
    const [Error3, setError3] = useState("")
    const [bool3, setbool3] = useState(true)

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getsalarylist();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

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

    async function getsalarylist() {
        let result9 = await fetch(`http://localhost:5000/salarylist/${params.id}`);// jo jo saare product list hai isme empty array me store honge 
        result9 = await result9.json();
        // setName_Of_Official(result9.Name_Of_Official);
        // setDesignation_Of_Official(result9.Designation_Of_Official);
        // setDepartment(result9.Department);
        // setFather_Husband_Name(result9.Father_Husband_Name)
        setEmp_no(result9.Emp_no);
        setName(result9.Name);
        setGender(result9.Gender);
        setDesignation(result9.Designation);
        setPresent_Salary(result9.Present_Salary);
        setTotal_days_in_months(result9.Total_days_in_months);
        setPay_days(result9.Pay_days);
        setFees_for_the_month(result9.Fees_for_the_month);
        setEPF(result9.EPF);
        setAdmn_charges(result9.Admn_charges);
        setESI(result9.ESI);
        setTotal_cost_for_DTU(result9.Total_cost_for_DTU);

    }

    async function updatesalarylist(e) {
        console.log(bool1,bool2,bool3);
        if (bool1 && bool2 && bool3) {
            e.preventDefault();
            console.log('chanduuuuuuuuuu');
            // console.log(Designation, NameOfDept, Name, Entitlement);
            console.log(params.id)
            let result11 = await fetch(`http://localhost:5000/salarylist/${params.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
                body: JSON.stringify({ Emp_no, Name, Gender, Designation, Present_Salary, Total_days_in_months, Pay_days, Fees_for_the_month, EPF, Admn_charges, ESI, Total_cost_for_DTU })
            });
            result11 = await result11.json();
            console.log(result11);
            // navigate('/employeedata')
            navigate('/outsourceStaffSalary')
        } else {
            alert(`please enter correct details first:`);
            e.preventDefault()
        }
    }


    return (
        <div id='updatefacilities'>
            <div class="form-body ">
                <div class="row">
                    <div class="form-holder">
                        <div class="form-content">
                            <div class="form-items ">
                                <h3>EDIT DETAILS</h3>
                                <p>Fill in the data below.</p>
                                <form>

                                    {/* <div class="col-md-12 ">
                                        <input type="text" className='inputBox' value={Emp_no} placeholder='enter EMP.No' onChange={(e) => { setEmp_no(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Name} placeholder='enter Name ' onChange={(e) => { setName(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Gender} placeholder="enter Gender " onChange={(e) => { setGender(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>

                                   

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Designation} placeholder='enter Designation.' onChange={(e) => { setDesignation(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>
                                    <div class="col-md-12 ">
                                        <input type="text" className='inputBox' value={Present_Salary} placeholder='enter Present Salary' onChange={(e) => { setPresent_Salary(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Total_days_in_months} placeholder='enter Total days oin months ' onChange={(e) => { setTotal_days_in_months(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Pay_days} placeholder="enter Pay_days " onChange={(e) => { setPay_days(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>
                                    <div class="col-md-12 ">
                                        <input type="text" className='inputBox' value={Fees_for_the_month} placeholder='enter Fees for the month' onChange={(e) => { setFees_for_the_month(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={EPF} placeholder='enter EPF ' onChange={(e) => { setEPF(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Admn_charges} placeholder="enter Admn_charges " onChange={(e) => { setAdmn_charges(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>

                                   

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={ESI} placeholder='enter ESI.' onChange={(e) => { setESI(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>


                                   

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Total_cost_for_DTU} placeholder='enter Total cost for DTU.' onChange={(e) => { setTotal_cost_for_DTU(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div> */}
                                    {/*  */}
                                    <div class="col-md-12 " >
                                        {/* <label  style={{whiteSpace:"pre"}} className='my-4 mx-2' >Emp No.</label> */}
                                        <input type="text" className='inputBox' value={Emp_no} placeholder='enter EMP.No' onChange={(e) => { setEmp_no(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12" >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>Name</label> */}
                                        <input type="text" className='inputBox' value={Name} placeholder='enter Name ' onChange={(e) => { setName(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12" >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>Gender</label> */}
                                        <input type="text" className='inputBox' value={Gender} placeholder="enter Gender " onChange={(e) => { setGender(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>



                                    <div class="col-md-12 " >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>Designation</label> */}
                                        <input type="text" className='inputBox' value={Designation} placeholder='enter Designation.' onChange={(e) => { setDesignation(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>
                                    <div class="col-md-12 " >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>Present Salary</label> */}
                                        <input type="text" className='inputBox' value={Present_Salary} placeholder='enter Present Salary' onChange={handlePresentSalary} style={{ fontWeight: "500" }} />
                                        {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                    </div>

                                    <div class="col-md-12" >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>total days in month</label> */}
                                        <input type="text" className='inputBox' value={Total_days_in_months} placeholder='enter Total days in the  month ' onChange={handleTotalDaysInMonth} style={{ fontWeight: "500" }} />
                                        {Error2 && <h7 style={{ color: 'red' }}>{Error2}</h7>}
                                    </div>

                                    <div class="col-md-12" >
                                        {/* <label style={{whiteSpace:"pre"}} className='my-4 mx-2'>Pay days</label> */}
                                        <input type="text" className='inputBox' value={Pay_days} placeholder="enter Pay_days " onChange={handlePayDays} style={{ fontWeight: "500" }} />
                                        {Error3 && <h7 style={{ color: 'red' }}>{Error3}</h7>}
                                    </div>
                                    {/* <div class="col-md-12 " >
                                        <input type="text" className='inputBox' value={Math.round(((Present_Salary / Total_days_in_months) * Pay_days))} placeholder='enter Fees for the month' onChange={(e) => { setFees_for_the_month(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12" >
                                        <input type="text" className='inputBox' value={Math.round(15000 * 0.12)} placeholder='enter EPF ' onChange={(e) => { setEPF(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12 " >
                                        <input type="text" className='inputBox' value={Math.round(0.01 * 15000)} placeholder="enter Admn_charges " onChange={(e) => { setAdmn_charges(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>



                                    <div class="col-md-12" >
                                        <input type="text" className='inputBox' value={Math.round(0.0325 * Fees_for_the_month)} placeholder='enter ESI.' onChange={(e) => { setESI(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>




                                    <div class="col-md-12" >
                                        <input type="text" className='inputBox' value={Math.round(Fees_for_the_month + EPF + Admn_charges + ESI)} placeholder='enter Total cost for DTU.' onChange={(e) => { setTotal_cost_for_DTU(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div> */}









                                    <div class="mt-3">
                                        <button class="btn btn-primary" onClick={updatesalarylist} >Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
