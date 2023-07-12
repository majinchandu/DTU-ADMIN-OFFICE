import React from 'react'
import backgroundphoto from './IMG_20230302_133257.jpg'
import samplePDF1 from './Application for ID Card.pdf'
import samplePDF2 from './intercom updated list.docx'
import samplePHOTO1 from './IMG_20230304_005919.jpg'
import samplePHOTO2 from './Screenshot (1).png'
import samplePHOTO3 from './basicfregistrar1.jpg'
import samplePHOTO4 from './basicfregistrar2.jpg'
import samplePHOTO5 from './basicfregistrarhw.jpg'
import samplePHOTO6 from './basicfdr.jpg'
import samplePHOTO7 from './basicfphyedu09.jpg'
import samplePHOTO8 from './basicfosd10.jpg'
import samplePHOTO9 from './basicfdrivers.jpg'
import samplePDF3 from './DGEHSLIST.pdf'
import samplePDF4 from './Revised+reimbursement+form+2004.pdf'
import samplePDF5 from './Checklist.pdf'
import samplePDF6 from './indent.docx'
import samplePDF7 from './Parliament_Constituency_Wise_Health_Facilities.pdf'


import { Link } from 'react-router-dom'
export default function Download() {
    return (
        <section class="intro">
            <div class="bg-image h-100" style={{ backgroundImage: `url(${backgroundphoto})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div class="mask d-flex align-items-center h-100" style={{ backgroundColor: "rgba(0,0,0,.25)" }}>
                    <div class="container" style={{animation: "1s ease-out 0s 1 slideInFromLeft"}}>
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <div class="card bg-dark shadow-2-strong chauhansabh">
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-dark table-borderless mb-0 mt-4">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className='text-decoration-underline'>S.No</th>
                                                        <th scope="col" className='text-center text-decoration-underline'>DESCRIPTION</th>
                                                        <th scope="col" className='text-decoration-underline'>DOWNLOAD/OPEN</th>
                                                        {/* <th scope="col">AGE</th>
                                                        <th scope="col">ADDRESS</th>
                                                        <th scope="col">SALARY</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td >Application form for issuance of identity  card</td>
                                                        <td><a href={samplePDF1} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>61</td>
                                                        <td>Edinburgh</td>
                                                        <td>$320,800</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td >List of Intercom numbers</td>
                                                        <td><a href={samplePDF2} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>23</td>
                                                        <td>Edinburgh</td>
                                                        <td>$103,600</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td >Circular: Authorization of Leave for six days working outsource workman</td>
                                                        <td><a href={samplePHOTO1} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>30</td>
                                                        <td>London</td>
                                                        <td>$90,560</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">4</th>
                                                        <td >Order: Basic Facilities to Hon'ble VC and Pro VC</td>
                                                        <td><a href={samplePHOTO2} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>22</td>
                                                        <td>Edinburgh</td>
                                                        <td>$342,000</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">5</th>
                                                        <td >Order: Basic Facilities to Registrar/HoD/Dean/COF/COE/Chief Warden/OIC B.Tech (Evening)
                                                            Head CC/ Director IQC/Head T&P and equivalent Officer based on functional requirement.</td>
                                                        <td><a href={samplePHOTO3} target="_blank" rel="noreferrer">Part1</a>
                                                        <a href={samplePHOTO4} target="_blank" rel="noreferrer"  className='mx-2'>Part2</a></td>
                                                        {/* <td>36</td>
                                                        <td>San Francisco</td>
                                                        <td>$470,600</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">6</th>
                                                        <td >Order: Basic Facilities to Hostel Warden/Security Officer/ Transport Officer/ Associate

                                                            HoD/Associate Director IQAC, Additional Director (IA), Assistant Diretor (IA)</td>
                                                        <td><a href={samplePHOTO5} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>43</td>
                                                        <td>London</td>
                                                        <td>$313,500</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">7</th>
                                                        <td >Order: Basic Facilities to Dy. Registrar/I/C Hostel Office/ Network Manager/ OSD (Exam&

                                                            results)/ Executive Engineer/OIC GA/OIC S&P/Librarian/Associate Deans and equivalent

                                                            Officer based on functional requirement/ Assistant Registrar/ Staff Officer to VC/

                                                            Account Officer/ Statistical Officer/AAO/Section Officer</td>
                                                        <td><a href={samplePHOTO6} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">8</th>
                                                        <td >Order: Basic Facilities to Director (Physical Education)</td>
                                                        <td><a href={samplePHOTO7} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">9</th>
                                                        <td >Order: Basic Facilities to OSD B.Tech. (Eve.)</td>
                                                        <td><a href={samplePHOTO8} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">10</th>
                                                        <td >Order: Basic Facilities to Drivers</td>
                                                        <td><a href={samplePHOTO9} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">11</th>
                                                        <td >LIST OF EMPANELLED PRIVATE HOSPITALS/ DIAGNOSTIC CENTRES UNDER DGEHS IN DELHI & NCR</td>
                                                        <td><a href={samplePDF3} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">12</th>
                                                        <td >Revised Medical Form for Reimbursement  and Check List</td>
                                                        <td><a href={samplePDF4} target="_blank" rel="noreferrer">Form</a>  +
                                                        <a href={samplePDF5} target="_blank" rel="noreferrer"  className='mx-1'>CheckList</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        {/* http://health.delhigovt.nic.in/wps/wcm/connect/DoIT_Health/health/home/directorate+general+of+health+services/dgehs/frequently+asked+questions */}
                                                        <th scope="row">13</th>
                                                        <td >FREQUENTLY ASKED QUESTIONS ABOUT DGEHS</td>
                                                        <td><a href='http://health.delhigovt.nic.in/wps/wcm/connect/DoIT_Health/health/home/directorate+general+of+health+services/dgehs/frequently+asked+questions' target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">14</th>
                                                        <td >Indent Form for Hospitality</td>
                                                        <td><a href={samplePDF6} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">15</th>
                                                        <td >LIST OF DELHI GOVT. DISPENSARY (DGEHS)</td>
                                                        <td><a href={samplePDF7} target="_blank" rel="noreferrer">Click Here</a></td>
                                                        {/* <td>19</td>
                                                        <td>Warsaw</td>
                                                        <td>$385,750</td> */}
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
