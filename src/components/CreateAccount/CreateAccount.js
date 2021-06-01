import React, { useState, useEffect, useCallback } from 'react';

import css from './CreateAccount.module.css';

import PulseLoader from '../PulseLoader/PulseLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import { onShowToast } from '../../containers/App/actions';

import { connect } from 'react-redux';

import Toast from '../Toast/Toast';

const CreateAccount = (props) => {

    const [showPass, setShowPass] = useState(false);

    const [showPassRep, setShowPassRep] = useState(false);

    const [showPulse, setShowPulse] = useState(false);

    const [user, setUser] = useState({
        isInvalid: null,
        message: '',
    });

    const [isUserTaken, setIsUserTaken] = useState(false);

    const [email, setEmail] = useState({
        isInvalid: null,
        message: '',
    });

    const [password, setPassword] = useState({
        isInvalid: null,
        message: '',
    });

    const [passwordRep, setPasswordRep] = useState({
        isInvalid: null,
        message: '',
    });

    const [accountData, setAccountData] = useState({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    })

    useEffect(() => {

        valPasswordRepeat();

    }, [accountData.repeatPassword]);

    const onShowPass = useCallback(() => {
        setShowPass(!showPass)
    }, [showPass]);

    const onShowPassRep = useCallback(() => {
        setShowPassRep(!showPassRep)
    }, [showPassRep]);

    const validateEmail = (email) => {

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {

            // console.log('email true')
            return true;
        }

        // console.log('email false')

        return false;
    }

    const validateUsername = (username) => {

        if (/^[a-zA-Z0-9_\-.]{2,24}$/g.test(username)) {

            return true;
        }
        else {

            return false;
        }
    }

    const validatePassword = (password) => {

        if (/^[A-Za-z\S]{8,32}$/g.test(password)) {

            return true;
        }
        else {

            return false;
        }
    }

    const valUser = () => {

        if (!validateUsername(accountData.username)) {

            setUser({
                isInvalid: true,
                message: 'Only letters, numbers or (-, _, .) allowed'
            })
        }
        else {

            setUser({
                isInvalid: false,
                message: '',

            })

            // axios check username used

            // console.log('axios username')

            props.onShowToast('Checking Username', 'success');

            axios({
                method: 'post',
                url: '/signup/username',
                data: {
                    username: accountData.username,
                }
            })
                .then(res => {

                    // console.log(res);
                    setIsUserTaken(false)

                })
                .catch(error => {

                    // console.log(error.response);
                    if(error?.response.status === 422) {

                        setUser({
                            isInvalid: true,
                            message: error.response.data.error[0],
                        })

                        setIsUserTaken(true)
                    }
                    else {   
                        props.onShowToast('Something Went Wrong.Try Again!!!', 'error');
                    }

                })
        }
    }

    const valEmail = () => {

        if (!validateEmail(accountData.email)) {

            setEmail({
                isInvalid: true,
                message: 'Invalid Email'
            })

            return false;
        }
        else {

            setEmail({
                isInvalid: false,
                message: ''
            })

            return true;
        }
    }

    const valPassword = () => {

        if (!validatePassword(accountData.password)) {
            setPassword({
                isInvalid: true,
                message: 'Password must be between 8 and 32 characters'
            })

            return false;
        }
        else {

            setPassword({
                isInvalid: false,
                message: ''
            })

            return true;
        }

    }

    const valPasswordRepeat = () => {

        if (accountData.password !== accountData.repeatPassword && valPassword()) {

            setPasswordRep({
                isInvalid: true,
                message: 'Passwords do not match'
            })

            return false;
        }
        else {

            setPasswordRep({
                isInvalid: false,
                message: ''
            })

            return true;
        }

    }

    const valUserOnSubmit = () => {

        if (!validateUsername(accountData.username)) {

            setUser({
                isInvalid: true,
                message: 'Username required'
            })

            return false;
        }
        else {

            setUser({
                isInvalid: false,
                message: '',

            })

            return true;
        }

    }

    const onCreateAccount = (e) => {

        e.preventDefault();

        if (!valUserOnSubmit() || !valEmail() || !valPassword() || !valPasswordRepeat()) {


            // console.log('SUBMIT FALSE');
            return;
        }

        if(isUserTaken) {

            setUser({
                isInvalid: true,
                message: 'Username NOT available',
            })

            return;
        }

        // console.log('submit TRUE')

        setShowPulse(true);

        axios({
            method: 'post',
            url: '/signup',
            data: {
                ...accountData,
            }
        })
            .then(res => {
                // console.log(res.data);

                setAccountData({
                    email: '',
                    username: '',
                    password: '',
                    repeatPassword: '',
                })

                setShowPulse(false);

                props.show();
            })
            .catch(error => {
                // console.log(error.message);
                // console.log(error.response.data.error);

                setShowPulse(false);

                if(error && error.response?.data.error){

                    props.onShowToast(error.response.data.error[0], 'error');

                    return;
                }

                props.onShowToast('Something Went Wrong.Try Again!!!', 'error');

            })
    }

    return (
        // <div className={css.createContainer}>

        <React.Fragment>

            <div className={css.formContainer}>

                <h2>Create Account</h2>

                <form onSubmit={onCreateAccount}>

                    <div className={css.inputBox}>
                        <label>Username</label>
                        <input type="text" placeholder="Username"
                            onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                            onBlur={valUser}
                        />
                        {user.isInvalid &&
                            <p>{user.message}</p>
                        }
                    </div>
                    <div className={css.inputBox}>
                        <label>E-Mail</label>
                        <input type="email" placeholder="E-Mail"
                            onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                            onBlur={valEmail}
                        />
                        {email.isInvalid &&
                            <p>{email.message}</p>
                        }
                    </div>
                    <div className={css.inputBox}>
                        <label>Password</label>
                        <input type={showPass ? "text" : "password"} placeholder="Password"
                            onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                            onBlur={valPassword}
                        />
                        <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPass} />
                        {password.isInvalid &&
                            <p>{password.message}</p>
                        }
                    </div>
                    <div className={css.inputBox}>
                        <label>Repeat Password</label>
                        <input type={showPassRep ? "text" : "password"} placeholder="Repeat Password"
                            onChange={(e) => setAccountData({ ...accountData, repeatPassword: e.target.value })}
                        />
                        <FontAwesomeIcon icon={showPassRep ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPassRep} />
                        {passwordRep.isInvalid &&
                            <p>{passwordRep.message}</p>
                        }
                    </div>
                    <div className={css.inputBoxSubmit}>
                        <input type="submit" value="Create Account" />
                        {
                            showPulse &&
                            <div className={css.loader}>
                                <PulseLoader />
                            </div>
                        }
                    </div>
                </form>

            </div>

            <Toast />
        </React.Fragment>

        // {/* // </div> */}
    );
}

export default connect(null, { onShowToast })(CreateAccount);

