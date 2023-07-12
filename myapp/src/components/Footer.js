import React from 'react'
import Typewriter from 'typewriter-effect';
import {FiSmile} from 'react-icons/fi'

export default function Footer() {
    return (
        <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50" >
            <div class="container text-center">
                <large>Copyright &copy; 2012. All rights of the site rest with DTU GA Branch </large>
                <h5 style={{color:"white"}}>
                    <strong>
                <Typewriter 
                    options={{
                        strings: [`PROVIDING SERVICE SINCE 1941`],
                        autoStart: true,
                        loop: true,
                        delay:55
                    }}
                /> </strong></h5>
            </div>
        </footer>
    )
}
