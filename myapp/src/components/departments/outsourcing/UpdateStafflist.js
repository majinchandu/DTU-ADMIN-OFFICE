import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdateStafflist() {

    const [Name_Of_Official, setName_Of_Official] = useState("")
    const [Designation_Of_Official, setDesignation_Of_Official] = useState("")
    const [Department, setDepartment] = useState("")
    const [Father_Husband_Name, setFather_Husband_Name] = useState("")

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getstafflist();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

    async function getstafflist() {
        let result9 = await fetch(`http://localhost:5000/stafflist/${params.id}`);// jo jo saare product list hai isme empty array me store honge 
        result9 = await result9.json();
        setName_Of_Official(result9.Name_Of_Official);
        setDesignation_Of_Official(result9.Designation_Of_Official);
        setDepartment(result9.Department);
        setFather_Husband_Name(result9.Father_Husband_Name)
        
    }

    async function updatestafflist(e) {
        e.preventDefault();

        

        console.log('chanduuuuuuuuuu');
        // console.log(Designation, NameOfDept, Name, Entitlement);
        console.log(params.id)
        let result11 = await fetch(`http://localhost:5000/stafflist/${params.id}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
            body: JSON.stringify({ Name_Of_Official, Designation_Of_Official, Department, Father_Husband_Name })
        });
        result11 = await result11.json();
        console.log(result11);
        // navigate('/employeedata')
        navigate('/outsourceStaffList')
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
                                        <input type="text" className='inputBox' value={Name_Of_Official} placeholder='enter Name Of Official' onChange={(e) => { setName_Of_Official(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Designation_Of_Official} placeholder='enter Designation ' onChange={(e) => { setDesignation_Of_Official(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Department} placeholder="enter Department " onChange={(e) => { setDepartment(e.target.value) }} style={{ fontWeight: "500" }} />
                                        
                                    </div>

                                   

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Father_Husband_Name} placeholder='enter father or husband name.' onChange={(e) => { setFather_Husband_Name(e.target.value) }} style={{ fontWeight: "500" }} />
                                       
                                    </div>

                                    

                                   

                                   
                                    <div class="mt-3">
                                        <button class="btn btn-primary" onClick={updatestafflist} >Update</button>
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
