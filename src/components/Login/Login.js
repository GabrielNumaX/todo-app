import React, { useState, useEffect, useCallback } from 'react';

import css from './Login.module.css';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
 
const Login = (props) => {

    const [showPass, setShowPass] = useState(false);

    const onShowPass = useCallback(() => {
        setShowPass(!showPass)
    }, [showPass])

    return(
        // <div className={css.loginContainer}>

            <div className={css.formContainer}>

                <h2>Login</h2>

                <form>

                    <div className={css.inputBox}>
                        <input type="text" placeholder="E-mail or Username"/>
                    </div>
                    <div className={css.inputBox}>
                        <input type={ showPass ? "text": "password"} placeholder="Password"/>
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