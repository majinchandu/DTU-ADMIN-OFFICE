import React from 'react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect';


export default function ContactUs() {
    return (
        <section id="contact">
            <div class="container" style={{animation: "1s ease-out 0s 1 slideInFromLeft"}}>
                
                <h1 class="text-center text-uppercase  mt-5 contactus">contact us</h1>
                
                {/* <p class="text-center w-75 m-auto"></p> */}
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 my-5">
                        <div class="card border-0 h-100">
                            <div class="card-body text-center">
                                <i class="fa fa-phone fa-5x mb-3" aria-hidden="true"></i>
                                <h4 class="text-uppercase mb-5">call us</h4>
                                <p> 011-27294673 (Direct)

Ext. 1108</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 my-5">
                        <div class="card border-0 h-100">
                            <div class="card-body text-center addressbox">
                                <i class="fa fa-map-marker fa-5x mb-3" aria-hidden="true"></i>
                                <h4 class="text-uppercase mb-1">office loaction</h4>
                                <address >Deputy Registrar/ Section Officer
                                    (Gen. Administration)
                                    Delhi Technological University
                                    Admn. Building
                                    Shahbad Daulatpur, Bawana Road,
                                    Delhi-110042 </address>
                            </div>
                        </div>
                    </div>
                    {/* <div class="col-sm-12 col-md-6 col-lg-3 my-5">
                        <div class="card border-0 h-100">
                            <div class="card-body text-center">
                                <i class="fa fa-map-marker fa-5x mb-3" aria-hidden="true"></i>
                                <h4 class="text-uppercase mb-5">office loaction</h4>
                                <address>Suite 02, Level 12, Sahera Tropical Center </address>
                            </div>
                        </div>
                    </div> */}
                    <div class="col-sm-12 col-md-6 col-lg-4 my-5">
                        <div class="card border-0 h-100">
                            <div class="card-body text-center">
                                <i class="fa fa-globe fa-5x mb-3" aria-hidden="true"></i>
                                <h4 class="text-uppercase mb-5">email</h4>
                                {/* <p><a href='malito:ga@dtu.ac.in'>ga@dtu.ac.in</a></p> */}
                                <p><Link to="mailto:ga@dtu.ac.in">ga@dtu.ac.in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
