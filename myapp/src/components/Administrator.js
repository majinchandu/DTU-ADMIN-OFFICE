import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";
import backgroundphoto from './Mesmerising view, Gene Raz von Edler.jpg'
import Signupusingadmin from './Signupusingadmin';
export default function Administrator(props) {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [success4, setsuccess4] = useState(props.success)
    const [err, seterr] = useState("")
    const Navigate = useNavigate()

    useEffect(() => {
        const authh = localStorage.getItem("user")
        if (authh) {
            Navigate('/admindata');
        }
    })


    async function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        // setemail('')
        // setpassword('')
        // setsuccess(true);

        console.log('cbgdguwd');
        console.log(email, password);
        let resulttt = await fetch('http://localhost:5000/loginadmin', {  // resulttt ke andar user naam ki uski saari details aajaengi aur uske corresponding unique token aayega 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        resulttt = await resulttt.json()
        console.log(resulttt, "suraj");
        if (resulttt.auth) { // agar result mila to chalao  ||    aur comparison kara rhe hai authToken ke basis pe 
            setsuccess4(true);
            console.log('hulk');
            localStorage.setItem("user", JSON.stringify(resulttt.exisUser)) //storage me uss user ko store kardo dobara se 
            localStorage.setItem("token", JSON.stringify(resulttt.auth))
        } else {
            console.log('hulk2');
            alert('please enter correct details')// agar user hi na mila ho toh
        }
        console.log('chandu is a goodboy');

    }

    return (
        
            <>{
                success4 ? (
                    Navigate('/admindata')
                ) : (
                    <div id="container1">
                        <div class="box" >
                            <div class="form-box">
                                <strong><i><h2 style={{ color: "black" }}>ADMINISTRATOR</h2></i></strong>
                                <div class="ic-account"></div>
                                <form name="login-form" action="#" method="post" onSubmit={handleSubmit} >
                                    <input class="login-form-input" type="email" name="your-email" placeholder="Email Address" required value={email} onChange={(e) => setemail(e.target.value)} />
                                    <input class="login-form-input" type="password" name="your-password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <button class="login-form-btn" type="submit">Login</button>
                                    {/* <p class="text"><a href="#">Forgot password?</a> or <a href="#">Sign up</a></p> */}
                                </form>
                            </div>
                            {/* <div class="circle-01"></div>
                <div class="circle-02"></div> */}
                        </div>
                    </div>
                )
            }

                
            </>

    )
}
