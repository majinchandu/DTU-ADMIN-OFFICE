import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdateBasicFacilities() {

    const [Designation, setDesignation] = useState("")
    const [NameOfDept, setNameOfDept] = useState("")
    const [Entitlement, setEntitlement] = useState("")
    const [Name, setName] = useState("")
    const [Disable, setDisable] = useState(false)
    
    const navigate = useNavigate();
    const params = useParams();
    const [Error, setError] = useState("")
    const [bool1, setbool1] = useState(true)


    useEffect(() => {
        getbasicfacilities();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

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

    async function getbasicfacilities() {
        let result9 = await fetch(`http://localhost:5000/basicfacilitieslist/${params.id}`);// jo jo saare product list hai isme empty array me store honge 
        result9 = await result9.json();
        setDesignation(result9.Designation);
        setNameOfDept(result9.NameOfDept);
        setEntitlement(result9.Entitlement);
        setName(result9.Name);
        setDisable(result9.Disable);


    }


    async function updatebasicfacilities(e) {
        if (bool1) {
            e.preventDefault();



            console.log('chanduuuuuuuuuu');
            console.log(Designation, NameOfDept, Name, Entitlement);
            console.log(params.id)
            let result11 = await fetch(`http://localhost:5000/basicfacilitieslist/${params.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json; charset=UTF-8" }, // ye lagana kabhi mat bhulna iske kaaran mere 2 ghante barbaad hue hai thik hai ??
                body: JSON.stringify({ Designation, NameOfDept, Name, Entitlement, Disable })
            });
            result11 = await result11.json();
            console.log(result11);
            navigate('/basicfacilities2')

        } else {
            alert(`please enter correct details first:`);
            e.preventDefault()
            // navigate(`/updatebasicfacilities/${params.id}`);
            // window.location.reload();
            // history.push('/same-page');
        }
    }
    function checked() {
        if (Entitlement == "" || Entitlement == "0") {
            return true;
        } else {
            return false;
        }
    }





    // async function  handleOnChange(event) {
    //     // setisChecked(!isChecked);
    //     // setDisable(!Disable)
    //     if (event.target.checked) {
    //         console.log('✅ Checkbox is checked');
    //         setEntitlement("0")
    //         // console.log(params.id)
    //         // let result11 = await fetch(`http://localhost:5000/entitlement/${params.id}`, {
    //         //     method: "PATCH",
    //         //     headers: { "Content-type": "application/json; charset=UTF-8" },
    //         //     body: JSON.stringify({ Entitlement })
    //         // });
    //         // result11 = await result11.json()
    //         // console.log(result11);
    //     } else {
    //         console.log('⛔️ Checkbox is NOT checked');
    //     }
    //     setDisable(current => !current);
    //     console.log(Disable);
    // };




    // async function updateentitlement() {


    //     if (Disable == true) {  // ye samjh nhi aaya aisa kyu hua true ki jagah false aarha hai 
    //         setEntitlement("0")
    //         console.log(params.id)
    //         let result11 = await fetch(`http://localhost:5000/entitlement/${params.id}`, {
    //             method: "PATCH",
    //             headers: { "Content-type": "application/json; charset=UTF-8" },
    //             body: JSON.stringify({ Entitlement })
    //         });
    //         result11 = await result11.json()
    //         console.log(result11);
    //     }

    // }





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
                                        <input type="text" className='inputBox' value={Designation} placeholder='enter Designation' onChange={(e) => { setDesignation(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={NameOfDept} placeholder='enter Name of Dept ' onChange={(e) => { setNameOfDept(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>

                                    <div class="col-md-12">
                                        <input type="text" className='inputBox' value={Name} placeholder='enter Proffessors Name' onChange={(e) => { setName(e.target.value) }} style={{ fontWeight: "500" }} />

                                    </div>



                                    <div class="col-md-12">
                                        {/* <input type="text" className='inputBox' value={Entitlement} placeholder='enter Entitlement' onChange={(e) => { setEntitlement(e.target.value) }} style={{ fontWeight: "500" }} /> */}
                                        <input type="text" className='inputBox' value={Entitlement} placeholder='enter Entitlement' onChange={handleEntitlement} style={{ fontWeight: "500" }} />
                                        {Error && <h7 style={{ color: 'red' }}>{Error}</h7>}
                                    </div>



                                    {/* <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={Disable} id="invalidCheck" onChange={handleOnChange}
                                        />
                                        <label class="form-check-label">Disable</label>
                                        <div class="invalid-feedback">Please confirm that the entered data are all correct!</div>
                                    </div> */}

                                    <div class="mt-3">
                                        <button class="btn btn-primary" onClick={updatebasicfacilities} >Update</button>
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
