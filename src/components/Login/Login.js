import React, { useState, useEffect, useCallback } from 'react';

import css from './Login.module.css';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';
 
const Login = (props) => {

    const [showPass, setShowPass] = useState(false);

    const onShowPass = useCallback(() => {
        setShowPass(!showPass)
    }, [showPass])

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const validateLogin = () => {

        if(loginData.email === '') {

            // handle toast

            return false;
        }

        if(loginData.password === ''){

            // handle toast

            return false;
        }

        return true;
    }

    const handleLogin = (e) => {
        e.preventDefault();

        // console.log(e);

        if(validateLogin()) {

            axios({
                method: 'post',
                url: '/login'
            })
            .then(res => {

                console.log(res.data);

                // handle token AND login;
                // Show loader;
            })
            .catch(error => {

                console.log(error);

                // handle error and Show toast
            })
        }
        else {
            // validate FAIL
            // show Toast;
        }
    }

    return(
        // <div className={css.loginContainer}>

            <div className={css.formContainer}>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div className={css.inputBox}>
                        <input type="text" placeholder="E-mail or Username"
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        />
                    </div>
                    <div className={css.inputBox}>
                        <input type={ showPass ? "text": "password"} placeholder="Password"
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        />
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPass}/>
                    </div>
                    <div className={css.inputBox}>
                        <input type="submit" value="Login"/>
                    </div>
                </form>

                <p className={css.forgot}>Don't have an account yet?  <span onClick={props.show}>Create One Here</span>
                    
                </p>

                <p className={css.forgot}>Forgot password? <span onClick={props.showForgot}>Click Here</span></p>

            </div>

        // </div> 

    )
}

export default Login;