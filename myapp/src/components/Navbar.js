import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
export default function Navbar(props) {
  const [success3, setsuccess3] = useState(props.success);
  const [downloadvalue, setdownloadvalue] = useState(false)
  const [contactvalue, setcontactvalue] = useState(false)
  const [employeecorner, setemployeecorner] = useState(false)
  console.log(downloadvalue);
  const Navigate = useNavigate()
  function changedownloadvalue() {
    setdownloadvalue(true);
    setcontactvalue(false);
    setemployeecorner(false);
  }
  function changecontactvalue() {
    setcontactvalue(true);
    setdownloadvalue(false);
    setemployeecorner(false);
  }
  function changehomevalue() {
    setcontactvalue(false);
    setdownloadvalue(false);
    setemployeecorner(false);
  }
  function changeemployeecorner() {
    setemployeecorner(true);
    setdownloadvalue(false);
    setcontactvalue(false)
  }

  const auth = localStorage.getItem('user')



  function logout() {
   
    console.log('chauhan sabh');
    localStorage.clear()
    // Navigate.replace('/employeedata')
    Navigate('/')
    // props.success = false;
    setsuccess3(false);
    window.location.reload();

  }
  return (
    <div>
      <nav class="navbar  navbar-dark bg-dark nav justify-content-center">
        <div class="container-fluid">
          <Link class="navbar-brand " to="/" onClick={changehomevalue} style={{whiteSpace:"normal"}}>
            <img 
              className="dtulogo rounded-circle navbar-brand"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_woUCV14NEn0QrHZzzlfyfksjXqDVpWUgDUjbjRqf&s"
              alt="DTU LOGO"
            /><>Delhi Technological University </>
          </Link>
          <h1 className="heading ">General Admin Office</h1>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className={`nav-link ${downloadvalue ? 'active' : ''}`} aria-current="page" to="/Download" onClick={changedownloadvalue}>
                  Downloads
                </Link>
              </li>
              <li class="nav-item">
                <Link className={`nav-link ${contactvalue ? 'active' : ''}`} to="/contactus" onClick={changecontactvalue}>
                  Contact Us
                </Link>
              </li>
              {
                auth ? (<li class="nav-item">
                  <Link className='nav-link' onClick={logout} to="/">
                    Logout
                  </Link>
                </li>) : (<li class="nav-item dropdown">
                  <Link
                    class={`nav-link dropdown-toggle ${employeecorner ? 'active' : ''}`} onClick={changeemployeecorner}
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Employee Corner
                  </Link>
                  <div className="chandu">
                    <ul class="dropdown-menu ">
                      <li className="dropdownAdmin mx-3">
                        <Link class="dropdown-item " to="/loginadmin">
                          Administrator
                        </Link>
                      </li>

                      <li className="dropdownDealingAss">
                        <Link class="dropdown-item " to="/loginemployee">
                          Dealing Assistant
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>)
              }
            </ul>
          </div>
        </div>
      </nav>

    </div>
  );
  console.log(downloadvalue);
}
