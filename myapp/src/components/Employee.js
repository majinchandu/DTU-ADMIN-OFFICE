import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

export default function Employee(props) {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [success2, setsuccess2] = useState(props.success)
    const [err, seterr] = useState("")
    const [Message, setMessage] = useState("")
    const Navigate = useNavigate()

    useEffect(() => {
        const authh = localStorage.getItem("user")
        if (authh) {
            Navigate('/employeedata');
        }
    })

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }


    async function handleSubmit(e) {
        e.preventDefault();
        // console.log(name, email, password);
        // // setemail('')
        // // setpassword('')
        // // setsuccess(true);
        // const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9*-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        // // const regEx  = if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test($('#email').val()))
        // if (regEx.test(email)) {
        //     setMessage("Email is Valid");
        //     console.log('cbgdguwd');
        //     console.log(name, email, password);
        //     let resulttt = await fetch('http://localhost:5000/loginemployee', {  // resulttt ke andar user naam ki uski saari details aajaengi aur uske corresponding unique token aayega 
        //         method: 'POST',
        //         body: JSON.stringify({ name, email, password }),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     resulttt = await resulttt.json()
        //     console.log(resulttt, "suraj");
        //     if (resulttt.auth) { // agar result mila to chalao  ||    aur comparison kara rhe hai authToken ke basis pe 
        //         // props.success = true;
        //         setsuccess2(true);
        //         console.log('hulk');
        //         localStorage.setItem("user", JSON.stringify(resulttt.exisUser)) //storage me uss user ko store kardo dobara se 
        //         localStorage.setItem("token", JSON.stringify(resulttt.auth))
        //     } else {
        //         console.log('hulk2');
        //         alert('please enter correct details')// agar user hi na mila ho toh
        //     }
        //     console.log('chandu is a goodboy');
        // }
        // else if (!regEx.test(email) && email !== "") {
        //     setMessage("Email is Not Valid");
        // }
        // else {
        //     setMessage("");
        // }

        console.log('cbgdguwd');
        console.log(name,email, password);
        let resulttt = await fetch('http://localhost:5000/loginemployee', {  // resulttt ke andar user naam ki uski saari details aajaengi aur uske corresponding unique token aayega 
            method: 'POST',
            body: JSON.stringify({name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        resulttt = await resulttt.json()
        console.log(resulttt, "suraj");
        if (resulttt.auth ) { // agar result mila to chalao  ||    aur comparison kara rhe hai authToken ke basis pe 
            // props.success = true;
            setsuccess2(true);
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
            success2 ? (
                Navigate('/employeedata')
            ) : (
                <div id="container2">
                    <div class="box">
                        <div class="form-box">
                            <strong><i><h2 style={{ color: "black" }}>EMPLOYEE</h2></i></strong>
                            <div class="ic-account"></div>
                            <form name="login-form" action="#" method="post" onSubmit={handleSubmit} >
                                <input class="login-form-input" type="text" name="your-name" placeholder="Name" required value={name} onChange={(e) => setname(e.target.value)} />
                                <input class="login-form-input" type="email" name="your-email" placeholder="Email Address" required value={email} onChange={(e) => setemail(e.target.value)} />
                                {/* <p>{Message}</p> */}
                                <input class="login-form-input" type="password" name="your-password" placeholder="Password" required value={password} onChange={(e) => setpassword(e.target.value)} />
                                <button class="login-form-btn" type="submit"  >Login</button>

                                {/* <p class="text"><a href="#">Forgot password?</a> or <a href="#">Sign up</a></p> */}
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    )
}

