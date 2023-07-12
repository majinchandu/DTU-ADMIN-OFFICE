import React, { useState, useEffect } from 'react'
import Reimbursement from './departments/Reimbursement'
import Tender from './departments/tender/Tender'
import Dghs from './departments/dghs/Dghs'
import Outsourcing from './departments/outsourcing/Outsourcing'
import Basicfacilities2 from './departments/reimbursement/Basicfacilities2'

export default function Employeedata() {


  const auth = localStorage.getItem("user")

  return (
    <div className='employeedata'>
      {/* <h1 className='jobdescription'>Hello, the job assigned to you is of  {JSON.parse(auth).role} !</h1> */}

      {JSON.parse(auth).role == "reimbursement" && (
        
        <Basicfacilities2 />
      )}

      {JSON.parse(auth).role == "tender" && (
        <Tender />
      )}

      {JSON.parse(auth).role == "dghs" && (
        <Dghs />
      )}
      {JSON.parse(auth).role == "outsourcing" && (
        <Outsourcing />
      )}

    </div>
  )
}
