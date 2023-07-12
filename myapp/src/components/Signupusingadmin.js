import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PWDRequisite from './PWDRequisite'
// import { useHistory } from 'react-router-dom';
export default function Signupusingadmin() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate();
    const [Error, setError] = useState("")
    const [Error2, setError2] = useState(null)
    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false)
    // const history = useHistory();

    const [pwdRequiste, setPWDRquisite] = useState(false);
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharCheck: false,
    });

    const handleOnChange = (e) => {
        setpassword(e.target.value);
      };
    
      const handleOnFocus = () => {
        setPWDRquisite(true);
      };
    
      const handleOnBlur = () => {
        setPWDRquisite(false);
      };

      const handleOnKeyUp = (e) => {
        const { value } = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length >= 8;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        setChecks({
          capsLetterCheck,
          numberCheck,
          pwdLengthCheck,
          specialCharCheck,
        });
      };

    // useEffect(() => {
    //     const auth = localStorage.getItem("user")
    //     if (auth) {
    //         navigate('/');
    //     }
    // })

    // const checkPasswordValidation = event => {
    //     setpassword(event.target.value)
    //     if(bool1 == false){
    //         const isWhitespace = /^(?=.*\s)/;
    //         if (isWhitespace.test(password)) {
    //            setError2("Password must not contain Whitespaces.");
    //            setbool1(false);
    //         }


    //         const isContainsUppercase = /^(?=.*[A-Z])/;
    //         if (!isContainsUppercase.test(password)) {
    //           setError2("Password must have at least one Uppercase Character.");
    //           setbool1(false);
    //         }


    //         const isContainsLowercase = /^(?=.*[a-z])/;
    //         if (!isContainsLowercase.test(password)) {
    //            setError2("Password must have at least one Lowercase Character.");
    //            setbool1(false);
    //         }


    //         const isContainsNumber = /^(?=.*[0-9])/;
    //         if (!isContainsNumber.test(password)) {
    //           setError2("Password must contain at least one Digit.");
    //           setbool1(false);
    //         }


    //         const isContainsSymbol =
    //           /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    //         if (!isContainsSymbol.test(password)) {
    //            setError2("Password must contain at least one Special Symbol.");
    //            setbool1(false);
    //         }


    //         const isValidLength = /^.{10,16}$/;
    //         if (!isValidLength.test(password)) {
    //           setError2("Password must be 10-16 Characters Long.");
    //           setbool1(false);
    //         }
    //         //  setError2(null);

    //     }
    //     else{
    //         setbool1(true);
    //     }
    // }

    // function isValidPassword(password) {
    //     return  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/.test(password);
    // }

    // const handlePassword = event => {
    //     if (!isValidPassword(event.target.value)) {
    //         setbool2(false);
    //         if(password == "")
    //             setError2('');
    //         else
    //             setError2("password is invalid");
    //     } else {
    //         setError2(null);
    //         setbool2(true);
    //     }

    //     setpassword(event.target.value);
    // };



    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmail = event => {
        if (!isValidEmail(event.target.value)) {
            setbool1(false);
            if (email == "")
                setError('');
            else
                setError("Email is invalid");
        } else {
            setError(null);
            setbool1(true);
        }

        setemail(event.target.value);
    };



    async function collectData(e) {
        // console.warn(email,password);
        // console.log("chandu");
        if (bool1 && checks.capsLetterCheck && 
            checks.numberCheck &&
            checks.pwdLengthCheck &&
            checks.specialCharCheck && name) {

            e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
            let resultt = await fetch('http://localhost:5000/register', { // connecting frontend with backend
                method: 'POST',// method post hai
                body: JSON.stringify({ name, email, password }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
                // ye name ,email,password wala data backend ki body me jaake store ho rha hai
                headers: {
                    'Content-Type': 'application/json'// ratlo
                }
            });
            resultt = await resultt.json()//converting result to json format
            // console.log(resultt); // agar result ache se store hogya hai to home page load kardo
            // console.log('chanduuuuuuuuuuuuuuuu');
            localStorage.setItem("user", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
            alert('new user  created successfully')
            // console.log("chandu")
            navigate('/admindata')
        }
        else {
            alert("please enter correct details first");
            e.preventDefault()
            navigate('/signupusingadmin');
            // window.location.reload();
            // history.push('/same-page');
        }

    }

    return (
        <div>
            <div id="container3">
                <div class="box">
                    <div class="form-box">
                        <strong><i><h2 style={{ color: "black", textAlign: "center" }}>CREATING USER BY ADMIN</h2></i></strong>
                        <div class="ic-account"></div>
                        <form name="login-form" action="#" method="post" onSubmit={collectData} >
                            <input class="login-form-input" type="text" name="your-name" placeholder="Name" required value={name} onChange={(e) => setname(e.target.value)} />
                            <input class="login-form-input" type="email" name="your-email" placeholder="Email Address" required value={email} onChange={handleEmail} />
                            {Error && <h7 style={{ color: 'white' }}>{Error}</h7>}
                            <input class="login-form-input" type="password" name="your-password" placeholder="Password" required value={password} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} onKeyUp={handleOnKeyUp} />
                            {pwdRequiste ? (
                                <PWDRequisite
                                capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                numberFlag={checks.numberCheck ? "valid" : "invalid"}
                                pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
                                 />
                            ) : null}
                            {/* {Error2 && <h7 style={{color: 'white'}}>{Error2}</h7>} */}
                            <button class="login-form-btn" type="submit" onClick={collectData}>Create</button>
                            {/* <p class="text"><a href="#">Forgot password?</a> or <a href="#">Sign up</a></p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
