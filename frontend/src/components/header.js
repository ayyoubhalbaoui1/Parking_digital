import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Login from './login'

function Header () {

    const token = localStorage.getItem('info')
    let history = useHistory()

    function LogOut () {
        localStorage.clear()
        history.push("/sign-in")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>Parking Digital</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                    {/* <li className="nav-item">
                                <Link className="nav-link " to={"/admin-dashboard"}>Admin Dashboard</Link>
                            </li> */}
                    {token ? 
                        <li className="nav-item">
                            <Link className="nav-link" onClick={LogOut}>LogOut</Link>
                        </li>
                        :
                        false
                    }
                            
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header