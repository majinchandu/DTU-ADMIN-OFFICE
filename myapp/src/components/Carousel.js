import React from "react";
import logo from './dtu-admin-office-logo.jpg'
export default function Carousel() {
    return (
        <div className=" backgroundimagecontainer ">

            <div id="carouselExampleFade" class="carousel slide carousel-fade hello" data-bs-ride="carousel">

                <div class="carousel-inner" >

 
                    <div className='carousel-caption' style={{ zIndex: "10" , animation: "1s ease-out 0s 1 slideInFromLeft"}}>
                        <div id='introductiontext'>
                            <div className="container ">
                                <img src={logo} alt="image not forund " className=" img-responsive img-fluid" />
                            </div>
                            {/* <div className="containerr">
                                <div className="bg-image">

                                </div>
                            </div> */}

                            <h1><strong> Welcome to the Web Page of General Administration Branch</strong></h1>
                            <h5>General Administration is one of key branch of the University which is also facilitating to the University by providing services like Outsourced Manpower, Cleaning Manpower, EPBX, DGEHS, reimbursement of bills of basic facilities available to the Faculty, Officers, arrangement of hospitality, assistance in organizing university functions etc. with passion and smile. Each of the staff member dedicatedly working to serve the university community in prompt and better way. The GA branch also works and honor the core value of the University and it is a part of duty to fulfill the vision and mission of the University.</h5>
                            {/* <h6 className="my-10">Copyright 2012. All rights of the site rest with DTU GA Branch</h6> */}
                        </div>
                    </div>
                    <div class="carousel-item active carousel-image bg-img-1" data-bs-interval="2000">
                        {/* <img src="https://qph.cf2.quoracdn.net/main-qimg-789e8aa06c17756ca1dcfed577d2d952-lq"  alt="..."  style={{ filter: "brightness(30%)",objectFit:"contain !important"}} className='backgroundimage' /> */}
                    </div>
                    <div class="carousel-item carousel-image bg-img-2" data-bs-interval="2000">
                        {/* <img src="https://i.ibb.co/pJdhHX8/1519797201497-e-2159024400-v-beta-t-Xgc-UHTAzw9t3ub-GEo-Wg-QP-f2-UUKgv-T2-V-Ivdp-F7-JSk-Y.jpg"  alt="..." style={{ filter: "brightness(30%)",objectFit:"contain !important"}} className='backgroundimage'/> */}
                    </div>
                    <div class="carousel-item carousel-image bg-img-3" data-bs-interval="2000">
                        {/* <img src="https://qph.cf2.quoracdn.net/main-qimg-c94f1b2656e0c950664b4ef917ffaaa6-lq"  alt="..." style={{ filter: "brightness(30%)",objectFit:"contain !important"}} className='backgroundimage'/> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
