import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import { MultilineInput } from 'react-input-multiline';

export default function Baicfacilities() {

    const [text, settext] = useState("")
    const [title, settitle] = useState("")
    const [basicfacilities, setbasicfacilities] = useState([])
    const params = useParams();
    const Navigate = useNavigate();
    const [enterstate, setenterstate] = useState(false)

    const auth = localStorage.getItem("basicfacilities")
    console.log(auth)

    useEffect(() => {
        getbasicfacilities();// isko useeffect me isliye daala hai taaki hum isse dekhe jase hi page reload aur na hi humare pass koi button th jisse onClick karke get Products wala function chal jaae to function page load hote hi apne aap chale isliye usse useEffect me daala hai
    }, [])

    async function getbasicfacilities() {
        let result6 = await fetch('http://localhost:5000/basicfacilitieslist');// jo jo saare product list hai isme empty array me store honge 
        result6 = await result6.json();// converted to json
        setbasicfacilities(result6);  // setted inside the empty array
        console.log(basicfacilities);
    }

    async function updatebasicfacilities(title, idd) {

        settitle(title);
        let result11 = await fetch(`http://localhost:5000/basicfacilitieslist/${idd}`, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({ title, text })
        });
        result11 = await result11.json()
        console.log(result11);
        // navigate('/')
        alert('Work Asisgned Succesfully ')
        window.location.reload();
        // Navigate('/basicfacilities')
    }

    async function collectData(e) {
        e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
        let resultt = await fetch('http://localhost:5000/registerbasicfacilities', { // connecting frontend with backend
            method: 'POST',// method post hai
            body: JSON.stringify({ title, text }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
            // ye name ,email,password wala data backend ki body me jaake store ho rha hai
            headers: {
                'Content-Type': 'application/json'// ratlo
            }
        });
        resultt = await resultt.json()//converting result to json format
        // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
        // console.log('chanduuuuuuuuuuuuuuuu');
        localStorage.setItem("basicfacility", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
        alert('new user  created successfully')
        // console.log("chandu")
        // Navigate('/basicfacilities')
        window.location.reload();

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


    // function breakline(e) {
    //     if (e.key == 'Enter') {
    //         //method to prevent from default behaviour
    //         // e.preventDefault();
    //         // return < br />;
    //         // var x = document.getElementById('creed').innerText += '&#13;&#10;'
    //         // console.log(x);
    //         // return x;
    //         let newElement = '&#13;&#10;';
    //         document.getElementById('creed').appendChild(newElement);
    //     }
    // }


    // function htmlupdate(title,id) {
    //     return (

    //             <div class="modal fade" id="myModal" role="dialog">
    //                 <div class="modal-dialog modal-dialog-centered">

    //                     <div class="modal-content" style={{ backgroundColor: "#c4afaf" }} >
    //                         <div class="modal-header" >
    //                             <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }}>Edit Info</h1>
    //                             <button type="button" class="close" data-bs-dismiss="modal">{<ImCross />}</button>
    //                         </div>
    //                         <div class="modal-body">
    //                             <textarea style={{ border: "solid black", height: "50px" }} class="login-form-input" type="text" value={text} onChange={(e) => settext(e.target.value)} />
    //                         </div>
    //                         <div class="modal-footer"   >
    //                             <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={() => updatebasicfacilities(title, id)}>Save</button>
    //                         </div>

    //                     </div>


    //                 </div>

    //             </div>
    //         )

    // }


    return (
        <>
            <div className='basicfacilities' >
                {
                    basicfacilities.map((item, index) =>

                        <div >
                            <div class="container d-flex justify-content-center" style={{ marginTop: "-20px" }}  >
                                <ul class="list-group mt-5" key={item._id}  >


                                    <div class="btn-group dropend"   >
                                        <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {item.title}
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-dark rounded" style={{ backgroundColor: "rgb(65 37 26)", width: "300px",overflowX:"auto",width:"auto" }}>
                                            <li class="dropdown-item" id='scott'  style={{whiteSpace:"pre"}}>{item.text} 
                                                <hr />
                                                <textarea id='creed'  style={{border: "solid black",color:"white",whiteSpace:""}}  rows={10} aria-multiline="true"  class="login-form-input" type="text" value={text} onChange={(e) => settext(e.target.value)}  /></li>
                                            <hr />
                                            <div style={{display:"flex",justifyContent:"space-evenly" }} > 
                                                <button type="button" class="btn btn-info btn-lg " onClick={()=>updatebasicfacilities(item.title, item._id)}>SAVE</button>
                                                <button type="button" class="btn btn-info btn-lg" onClick={()=> deletebasicfacilities(item._id)}>DELETE</button>
                                            </div>
                                        </ul>
                                    </div>


                                    {/* <div class="modal fade" id="myModal" role="dialog">
                                        <div class="modal-dialog modal-dialog-centered">

                                            <div class="modal-content" style={{ backgroundColor: "#c4afaf" }} >
                                                <div class="modal-header" >
                                                    <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }}>Edit Info</h1>
                                                    <button type="button" class="close" data-bs-dismiss="modal">{<ImCross />}</button>
                                                </div>
                                                <div class="modal-body">
                                                    <textarea style={{ border: "solid black", height: "50px" }} class="login-form-input" type="text" value={text} onChange={(e) => settext(e.target.value)} />
                                                </div>
                                                <div class="modal-footer"   >
                                                    <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={() => updatebasicfacilities(item.title, item._id)}>Save</button>
                                                </div>

                                            </div>


                                        </div>

                                    </div>

                                    <div class="modal fade" id="myModal3" role="dialog" >
                                        <div class="modal-dialog modal-dialog-centered"  >

                                            <div class="modal-content" style={{ backgroundColor: "#c4afaf" }} >

                                                <div class="modal-header">
                                                    <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }} >DELETE DATA</h1>
                                                    <button type="button" class="close" data-bs-dismiss="modal" style={{ border: "none" }}>{<ImCross />}</button>
                                                </div>
                                                <div class="modal-body">
                                                    <p style={{ fontSize: "20px" }}> Are you sure you want to delete the Data ??</p>
                                                </div>


                                                <div class="modal-footer " >
                                                    <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={() => deletebasicfacilities(item._id)} >DELETE</button>
                                                </div>


                                            </div>
                                        </div>
                                    </div> */}
                                </ul>
                            </div>


                        </div>
                    )
                }

                <div id='btncontainer'>
                    <button type="button" class="btn btn-danger rounded my-3 w-10 " data-bs-toggle="modal" data-bs-target="#myModall">New Data</button>
                </div>





                {/*     UPDATE  */}

                {/* <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-dialog-centered">
                        {
                            basicfacilities.map((item, index) =>
                                <div class="modal-content" style={{ backgroundColor: "#c4afaf" }} key={item._id}>
                                    <div class="modal-header" >
                                        <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }}>Edit Info</h1>
                                        <button type="button" class="close" data-bs-dismiss="modal">{<ImCross />}</button>
                                    </div>
                                    <div class="modal-body">
                                        <textarea style={{ border: "solid black", height: "50px" }} class="login-form-input" type="text" value={text} onChange={(e) => settext(e.target.value)} />
                                    </div>
                                    <div class="modal-footer" key={item._id}  >
                                        <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={() => updatebasicfacilities(item.title, item._id)}>Save</button>
                                    </div>

                                </div>

                            )
                        }
                    </div>

                </div> */}





                {/* DELETE */}


                {/* <div class="modal fade" id="myModal3" role="dialog" >
                    <div class="modal-dialog modal-dialog-centered"  >
                        {
                            basicfacilities.map((item, index) =>


                                <div class="modal-content" style={{ backgroundColor: "#c4afaf" }} >

                                    <div class="modal-header">
                                        <h1 class="modal-title" style={{ marginLeft: "auto", marginRight: "auto" }} >DELETE DATA</h1>
                                        <button type="button" class="close" data-bs-dismiss="modal" style={{ border: "none" }}>{<ImCross />}</button>
                                    </div>
                                    <div class="modal-body">
                                        <p style={{ fontSize: "20px" }}> Are you sure you want to delete the Data ??</p>
                                    </div>


                                    <div class="modal-footer " key={item._id}>
                                        <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={() => deletebasicfacilities(item._id)} >DELETE</button>
                                    </div>


                                </div>


                            )
                        }
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
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Enter Title" />
                                <textarea style={{ border: "solid black" }} class="login-form-input" type="text" value={text} onChange={(e) => settext(e.target.value)} placeholder="Enter Text" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default btn-light" data-bs-dismiss="modal" onClick={collectData}>Save</button>
                            </div>
                        </div>


                    </div>
                </div>

            </div >

        </>
    )
}