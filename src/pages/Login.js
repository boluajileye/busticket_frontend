import React, { useEffect } from 'react'
import "../auth.css";
import { useState } from "react";
import instance from '../api/Api_instance';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user != null) {
        navigate("/home")
    }
    });

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = {
            "email": email,
            "password": password
          }
        await instance({
            url: `auth/login`,
            method: "POST",
            data: data,
          })
          .then(function (response) {
            localStorage.setItem("user", JSON.stringify(response.data));
            if (response.data.user.role === 0) {
            navigate("/");
            } else {
            navigate("/home");
            }
            // localStorage.clear()
            // console.log(JSON.parse(localStorage.getItem("user")))
          })
          .catch(function (error) {
            console.log(error.response.data);
            setPassword("")
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
              });
        
          });
    }


    return (
        <div className="authcontainer">
            <ToastContainer />
            <div className="authscreen">
                <div className="authscreen__content">
                {/* <h1 className='text-dark text-center'>DANFO</h1> */}
                    <form className="authlogin" onSubmit={handleSubmit}>
                        <div className="authlogin__field">
                            <i className="authlogin__icon fas fa-user"></i>
                            <input type="email" className="authlogin__input" placeholder="user@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="authlogin__field">
                            <i className="authlogin__icon fas fa-lock"></i>
                            <input type="password" className="authlogin__input" placeholder="********" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="button authlogin__submit">
                            <span className="authbutton__text">Sign in</span>
                            <i className="authbutton__icon"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></i>
                        </button>
                    </form>
                </div>
                <div className="authscreen__background">
                    <span className="authscreen__background__shape authscreen__background__shape4"></span>
                    <span className="authscreen__background__shape authscreen__background__shape3"></span>
                    <span className="authscreen__background__shape authscreen__background__shape2"></span>
                    <span className="authscreen__background__shape authscreen__background__shape1"></span>
                </div>
            </div>
        </div>
    )
}

export default Login