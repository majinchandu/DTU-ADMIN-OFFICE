import React from 'react'
import { Link } from 'react-router-dom'
export default function Reimbursement() {
    return (
        <div>
            <div class="radius-icon col-lg-6 col-md-6 col-sm-6">
                <Link to ='/basicfacilities2' href="#" class="btn btn-xs btn-success">
                    <i class="fa fa-check" aria-hidden="true"></i> Basic Facilities
                </Link>
                <Link to ='' href="#" class="btn btn-xs btn-info">
                    <i class="fa fa-check" aria-hidden="true"></i> Blue Button
                </Link>
                <Link to ='' href="#" class="btn btn-xs btn-warning">
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
                </Link>
            </div>
        </div>
    )
}
