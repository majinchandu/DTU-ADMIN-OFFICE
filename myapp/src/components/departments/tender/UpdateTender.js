import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdateTender() {

    const [File_No, setFile_No] = useState("")
    const [Name_Of_Allotment, setName_Of_Allotment] = useState("")
    const [Allotee_name, setAllotee_name] = useState("")
    const [Vendor_Contact_No, setVendor_Contact_No] = useState("")
    const [Date_Of_Award_Of_Contract, setDate_Of_Award_Of_Contract] = useState("")
    const [Contract_Valid_Upto, setContract_Valid_Upto] = useState("")
    const [Remarks, setRemarks] = useState("")
    const [Error, setError] = useState("")
    const [bool1, setbool1] = useState(true)

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        gettender();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

    async function gettender() {
        let result9 = await fetch(`http://localhost:5000/tenderlist/${params.id}`);// jo jo saare product list hai isme empty array me store honge 
        result9 = await result9.json();
        setFile_No(result9.File_No);
        setName_Of_Allotment(result9.Name_Of_Allotment);
        setAllotee_name(result9.Allotee_name);
        setVendor_Contact_No(result9.Vendor_Contact_No)
        setDate_Of_Award_Of_Contract(result9.Date_Of_Award_Of_Contract);
        setContract_Valid_Upto(result9.Contract_Valid_Upto)
        setRemarks(result9.Remarks);
    }

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

    async function updatetender(e) {
        if (bool1) {
            e.preventDefault();
    
            
    
            console.log('chanduuuuuuuuuu');
            // console.log(Designation, NameOfDept, Name, Entitlement);
            console.log(params.id)
            let result11 = await fetch(`http://localhost:5000/tenderlist/${params.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
                body: JSON.stringify({ File_No, Name_Of_Allotment, Allotee_name, Vendor_Contact_No, Date_Of_Award_Of_Contract,Contract_Valid_Upto,Remarks })
            });
            result11 = await result11.json();
            console.log(result11);
            navigate('/employeedata')
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

                                    <div class="col-md-12 ">
                                        <input type="text" className='inputBox' value={File_No} placeholder='enter File_No' onChange={(e) => { setFile_No(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Name_Of_Allotment} placeholder='enter Name of Dept ' onChange={(e) => { setName_Of_Allotment(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Allotee_name} placeholder="enter Allotee's Name " onChange={(e) => { setAllotee_name(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>

                                   

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Vendor_Contact_No} placeholder='enter Vendor contact no.' onChange={(e) => { setVendor_Contact_No(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Date_Of_Award_Of_Contract} placeholder='enter Date_Of_Award_Of_Contract ' onChange={(e) => { setDate_Of_Award_Of_Contract(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Contract_Valid_Upto.substring(0,10)} placeholder='enter Contract valid upto ' onChange={handleContract_Valid_Upto} style={{ fontWeight: "500" }} />
                                        {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                       <label>Enter contact valid upto in format (YYYY-MM-DD) only</label>
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Remarks} placeholder='enter Remarks ' onChange={(e) => { setRemarks(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                   

                                   
                                    <div class="mt-3">
                                        <button class="btn btn-primary" onClick={updatetender} >Update</button>
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
