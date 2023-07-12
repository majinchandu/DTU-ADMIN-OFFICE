import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from './dtu-admin-office-logo.jpg'

export default function Home() {

    const Navigate = useNavigate();
   

    window.history.forward();
    function noBack() {
        window.history.forward();
    }
    
    
    return (
        <div className="homepage " >
            <div className="jimhalpert" style={{ zIndex: "10", animation: "1s ease-out 0s 1 slideInFromLeft" }}>
                <div className="adminofficelogo ">
                    <img src={logo} alt="dtulogo" className='dtulogo2 my-5 img-responsive img-fluid' />
                </div>
                <div className='text-wrap' id='introtext' style={{color:"white",zIndex:"1"}}>
                    <h1 className='text-center'><strong> Welcome to the Web Page of General Administration Branch</strong></h1>
                    <h5 className='text-center '>General Administration is one of key branch of the University which is also facilitating to the University by providing services like Outsourced Manpower, Cleaning Manpower, EPBX, DGEHS, reimbursement of bills of basic facilities available to the Faculty, Officers, arrangement of hospitality, assistance in organizing university functions etc. with passion and smile. Each of the staff member dedicatedly working to serve the university community in prompt and better way. The GA branch also works and honor the core value of the University and it is a part of duty to fulfill the vision and mission of the University.</h5>
                </div>
            </div>
        </div>
    )
}
