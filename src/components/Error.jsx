import React from "react";
import { Link } from "react-router-dom";

const Error = () =>{
    return (
    <div className="errdv1">
        <h1>404</h1>
        <h5>SORRY! PAGE NOT FOUND</h5>
        <p>Oops! It seems like the page you're trying to access doesn't exist. If you <br/> believe there's an issue, feel free to report it, and we'll look into it.</p>
        <div>
            <Link to='/'><button>RETURN HOME</button></Link>
            <Link to='/contact'><button>REPORT PROBLEM</button></Link>
        </div>
    </div>
)}

export default Error