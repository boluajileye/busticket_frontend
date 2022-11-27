import React from 'react'
import "../auth.css";

const Register = () => {
    // const [email, setEmail] = useState("")
    // const [name, setName] = useState("")
    // const [password, setPassword] = useState("")
    return (
        <div className="authcontainer">
            <div className="authscreen">
                <div className="authscreen__content">
                    <form className="authlogin">
                        <div className="authlogin__field">
                            <i className="authlogin__icon fas fa-user"></i>
                            <input type="text" className="authlogin__input" placeholder="John Doe" />
                        </div>
                        <div className="authlogin__field">
                            <i className="authlogin__icon fas fa-user"></i>
                            <input type="text" className="authlogin__input" placeholder="user@mail.com" />
                        </div>
                        <div className="authlogin__field">
                            <i className="authlogin__icon fas fa-lock"></i>
                            <input type="password" className="authlogin__input" placeholder="********" />
                        </div>
                        <button className="button authlogin__submit">
                            <span className="authbutton__text">Register</span>
                            <i className="authbutton__icon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg></i>
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

export default Register