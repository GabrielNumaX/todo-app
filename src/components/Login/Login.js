import React, { useState, useEffect } from 'react';

import css from './Login.module.css';


const Login = (props) => {



    return(
        <div className={css.loginContainer}>

            <div className={css.formContainer}>

                <h2>Login</h2>

                <form>

                    <div className={css.inputBox}>
                        <input type="text" placeholder="E-mail or Username"/>
                    </div>
                    <div className={css.inputBox}>
                        <input type="password" placeholder="Password"/>
                    </div>
                    <div className={css.inputBox}>
                        <input type="submit" value="Login"/>
                    </div>
                </form>

                <p className={css.forgot}>Don't have an account yet? <span>Create One Here</span></p>

                <p className={css.forgot}>Forgot password? Click Here</p>

            </div>

        </div>

    )
}

export default Login;