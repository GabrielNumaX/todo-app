import React, { useState, useEffect, useCallback } from 'react';

import css from './CreateAccount.module.css';

import PulseLoader from '../PulseLoader/PulseLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const CreateAccount = (props) => {

    const [showPass, setShowPass] = useState(false);

    const [showPassRep, setShowPassRep] = useState(false);

    const [user, setUser] = useState({
        isInvalid: null,
        message: '',
    });

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
            return true;
        }

        return false;
    }

    const validateUsername = (username) => {

        if(/^[a-zA-Z0-9_\-.]{2,24}$/g.test(username)) {

            return true;
        }
        else {

            return false;
        }
    }

    const valUser = () => {

        if(!validateUsername(accountData.username)){

            setUser({
                isInvalid: true,
                message: 'Only letters, numbers or (-, _, .) allowed'
            })
        }
        else {

            setUser({
                isInvalid: false,
                message: ''
            })

            // axios check user name used
        }
    }

    const valEmail = () => {

        if(!validateEmail(accountData.email)) {

            setEmail({
                isInvalid: true,
                message: 'Invalid Email'
            })
        }
        else {

            setEmail({
                isInvalid: false,
                message: ''
            })
        }
    }

    const valPassword = () => {

        if(accountData.password.length < 8 || accountData.password.length > 32) {
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


        if(accountData.password !== accountData.repeatPassword) {

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
    
    const onCreateAccount = (e) => {

        e.preventDefault();

        if(!validateEmail(accountData.email || !validateUsername(accountData.username) 
            || !valPassword() || !valPasswordRepeat())
        ) {

            // handle toast MESSAGE mising data
            console.log('Submit FALSE');
            return;
        }
    }

    return (
        // <div className={css.createContainer}>

        <div className={css.formContainer}>

            <h2>Create Account</h2>

            <form onSubmit={onCreateAccount}>

                <div className={css.inputBox}>
                    <label>Username</label>
                    <input type="text" placeholder="Username" 
                        onChange={(e) => setAccountData({...accountData, username: e.target.value})}
                        onBlur={valUser}
                    />
                    {   user.isInvalid &&
                        <p>{user.message}</p>
                    }
                </div>
                <div className={css.inputBox}>
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" 
                        onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                        onBlur={valEmail}
                    />
                    {   email.isInvalid &&
                        <p>{email.message}</p>
                    }
                </div>
                <div className={css.inputBox}>
                    <label>Password</label>
                    <input type={showPass ? "text" : "password"} placeholder="Password" 
                        onChange={(e) => setAccountData({...accountData, password: e.target.value})}
                        onBlur={valPassword}
                    />
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPass} />
                    {   password.isInvalid &&
                        <p>{password.message}</p>
                    }
                </div>
                <div className={css.inputBox}>
                    <label>Repeat Password</label>
                    <input type={showPassRep ? "text" : "password"} placeholder="Repeat Password" 
                        onChange={(e) => setAccountData({...accountData, repeatPassword: e.target.value})}
                    />
                    <FontAwesomeIcon icon={showPassRep ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPassRep} />
                    {   passwordRep.isInvalid &&
                        <p>{passwordRep.message}</p>
                    }
                </div>
                <div className={css.inputBoxSubmit}>
                    <input type="submit" value="Create Account" />
                    {/* <div className={css.loader}>
                            <PulseLoader/>
                        </div> */}
                </div>
            </form>

        </div>

        // </div>
    );
}

export default CreateAccount;

