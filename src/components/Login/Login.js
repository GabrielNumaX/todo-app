import React, { useState, useEffect, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import css from './Login.module.css';

import Toast from '../Toast/Toast';
import PulseLoader from '../PulseLoader/PulseLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';

import { connect } from 'react-redux';

import { setLogInOut, onShowToast } from '../../containers/App/actions';

const Login = (props) => {

    const history = useHistory();

    const [showPass, setShowPass] = useState(false);

    const [showPulse, setShowPulse] = useState(false);

    const onShowPass = useCallback(() => {
        setShowPass(!showPass)
    }, [showPass])

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    console.log(props);

    React.useEffect(() => {
        if(localStorage.token) {

            props.setLogInOut(true);

            history.push("/tasks")
        }
        else if(localStorage.token && props.isLoggedIn) {

            props.setLogInOut(true);

            history.push('/tasks');
        }
    },[props.isLoggedIn]);

    const validateLogin = () => {

        if (loginData.email === '') {

            props.onShowToast('Enter E-Mail or Username', 'error');

            return false;
        }

        if (loginData.password === '') {

            props.onShowToast('Enter your Password', 'error');

            return false;
        }

        return true;
    }

    const handleLogin = (e) => {

        e.preventDefault();

        if (validateLogin()) {

            setShowPulse(true);

            axios({
                method: 'post',
                url: '/login',
                data: {
                    email: loginData.email,
                    password: loginData.password,
                }
            })
                .then(res => {

                    localStorage.setItem('token', res.data.token);
                    props.setLogInOut(true);

                    setShowPulse(false);
                })
                .catch(error => {
            
                    if (error.response.data.hasOwnProperty('message')) {

                        console.log('catch IF');

                        props.onShowToast(error.response.data.message, 'error')
                    }
                    else {

                        props.onShowToast('Something Went Wrong.Try Again!!!', 'error')
                    }

                    setShowPulse(false);
                })
        }
    }

    return (

        <React.Fragment>
            {/* // <div className={css.loginContainer}> */}

            <div className={css.formContainer}>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div className={css.inputBox}>
                        <input type="text" placeholder="E-mail or Username"
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                    </div>
                    <div className={css.inputBox}>
                        <input type={showPass ? "text" : "password"} placeholder="Password"
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPass} />
                    </div>
                    <div className={css.inputBox}>
                        <input type="submit" value="Login" />
                        {
                            showPulse &&
                            <div className={css.loader}>
                                <PulseLoader />
                            </div>
                        }
                    </div>
                </form>

                <p className={css.forgot}>Don't have an account yet?  <span onClick={props.showCreate}>Create One Here</span>

                </p>

                <p className={css.forgot}>Forgot password? <span onClick={props.showForgot}>Click Here</span></p>

            </div>

            <Toast />

            {/* // </div>  */}

        </React.Fragment>

    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.app.isLoggedIn
})

export default connect(mapStateToProps, { setLogInOut, onShowToast })(Login);

// export default Login;