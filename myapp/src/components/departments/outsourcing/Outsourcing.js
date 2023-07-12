import React from 'react'
import { Link } from 'react-router-dom'
export default function Outsourcing() {
    const auth = localStorage.getItem("user");
    return (
        <div className='outsourcinghomepage '>
            <h1 className='jobdescription' style={{marginTop:"3rem"}}>Hello, the job assigned to you is of  {JSON.parse(auth).role} !</h1>
            <div class="radius-icon col-lg-3 col-md-3 col-sm-3" style={{ marginTop: "20vh" }}>
                <Link to='/outsourceStaffList' href="#" class="btn btn-xs btn-danger">
                    <i class="fa fa-check" aria-hidden="true"></i> Department wise list for Outsource staff
                </Link>
                <Link to='/outsourceStaffSalary' href="#" class="btn btn-xs btn-info">
                    <i class="fa fa-check" aria-hidden="true"></i> Salary Sheet for Outsource staff
                </Link>
                {/* <Link to ='' href="#" class="btn btn-xs btn-warning">
                    <i class="fa fa-check" aria-hidden="true"></i> Yellow Button
                </Link>
                <Link to ='' href="#" class="btn btn-xs btn-primary">
                    <i class="fa fa-check" aria-hidden="true"></i> Blue Button
                </Link>
                <Link to ='' href="#" class="btn btn-xs btn-danger">
                    <i class="fa fa-check" aria-hidden="true"></i> Red Button
                </Link>
                <Link to ='' href="#" class="btn btn-xs btn-purple">
                    Orange Button <i class="fa fa-check" aria-hidden="true"></i>
                </Link> */}
            </div>
        </div>
    )
}
