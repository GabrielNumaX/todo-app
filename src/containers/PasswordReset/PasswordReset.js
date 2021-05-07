import React, { useState, useEffect, useCallback } from 'react';

import { useLocation, useHistory } from "react-router-dom";

import css from './PasswordReset.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import axios from 'axios';

import { onShowToast } from '../App/actions';

import { connect } from 'react-redux';

import Toast from '../../components/Toast/Toast';
import PulseLoader from '../../components/PulseLoader/PulseLoader';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader'

const PasswordReset = (props) => {

    const history = useHistory();

    const query = new URLSearchParams(useLocation().search);

    const token = query.get('token');
    const userId = query.get('id');

    const [showPass, setShowPass] = useState(false);

    const [showPassRep, setShowPassRep] = useState(false);

    const [showPulse, setShowPulse] = useState(false);

    const [password, setPassword] = useState({
        isInvalid: null,
        message: '',
    });

    const [passwordRep, setPasswordRep] = useState({
        isInvalid: null,
        message: '',
    });

    const [accountData, setAccountData] = useState({
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



    const validatePassword = (password) => {

        if (/^[A-Za-z\S]{8,32}$/g.test(password)) {

            return true;
        }
        else {

            return false;
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


    const onPasswordReset = (e) => {

        e.preventDefault();

        if (!valPassword() || !valPasswordRepeat()) {

            return;
        }

        // console.log('submit TRUE')

        setShowPulse(true);

        axios({
            method: 'post',
            url: '/password/reset',
            data: {
                token,
                userId,
                password: accountData.password,
            }
        })
            .then(res => {
                // console.log(res.data);

                setShowPulse(false);

                props.onShowToast('Password Changed', 'success');

                history.push('/');
            })
            .catch(error => {
                // console.log(error.response.data.message);
                // console.log(error.response.data.error);

                setShowPulse(false);

                if(error && error.response.data?.message){

                    props.onShowToast(error.response.data.message, 'error');

                    return;
                }

                props.onShowToast('Something Went Wrong.Try Again!!!', 'error');

            })
    }

    return (
        // <div className={css.createContainer}>

        <React.Fragment>

            <div className={css.welcome}>
                <WelcomeHeader 
                    show={'login'} 
                    // onShowLogin={() => setShowComponent('login')} 
                />
                <div className={css.welcomeContainer}>


                    <div className={css.formContainer}>

                        <h2>Reset Password</h2>

                        <form onSubmit={onPasswordReset}>

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
                                <input type="submit" value="Reset Password" />
                                {
                                    showPulse &&
                                    <div className={css.loader}>
                                        <PulseLoader />
                                    </div>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <Toast />
        </React.Fragment>

    );
}

export default connect(null, { onShowToast })(PasswordReset);

