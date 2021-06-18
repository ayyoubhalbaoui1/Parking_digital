import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Header from './header'


function Login () {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    toast.configure()
    let history = useHistory()

    function logIn () {
        fetch("http://localhost:8080/api/admins/allAdmins").then(res => {
            return res.json()
        }).then(data => {
            //console.log(data, email, password)
            data.map(i => {
                if(i.email == email && i.password == password){
                    localStorage.setItem('info', i)
                    history.push("/admin-dashboard")
                } else {
                    toast.error("Error in Password Or Email !!!")
                }
            })
        })
    }

    useEffect(() => {
        //console.log(email, password)
    }, [])

        return (
        <div className="App">
        <Header />
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={event => setPassword(event.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={logIn}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
        </div>
        </div>
        );
    }

export default Login