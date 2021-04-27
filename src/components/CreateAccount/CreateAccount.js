import React, { useState, useEffect, useCallback } from 'react';

import css from './CreateAccount.module.css';

import PulseLoader from '../PulseLoader/PulseLoader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const CreateAccount = (props) => {

    const [showPass, setShowPass] = useState(false);

    const [showPassRep, setShowPassRep] = useState(false);

    const onShowPass = useCallback(() => {
        setShowPass(!showPass)
    }, [showPass]);

    const onShowPassRep = useCallback(() => {
        setShowPassRep(!showPassRep)
    }, [showPassRep]);

    const validateEmail = (email) => {

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }
        // alert("You have entered an invalid email address!")
        return false;
    }

    const validateUsername = (username) => {

        if(/^[a-zA-Z0-9_\-.]{2,16}$/g.test(username)) {
            return true;
        }
        else {

            return false;
        }
    }


    return (
        // <div className={css.createContainer}>

        <div className={css.formContainer}>

            <h2>Create Account</h2>

            <form>

                <div className={css.inputBox}>
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                    <p>Username already in use</p>
                </div>
                <div className={css.inputBox}>
                    <label>E-Mail</label>
                    <input type="email" placeholder="E-Mail" />
                    <p>E-Mail already in use</p>
                </div>
                <div className={css.inputBox}>
                    <label>Password</label>
                    <input type={showPass ? "text" : "password"} placeholder="Password" />
                    <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPass} />
                    <p>Password must be 8 characters long</p>
                </div>
                <div className={css.inputBox}>
                    <label>Repeat Password</label>
                    <input type={showPassRep ? "text" : "password"} placeholder="Repeat Password" />
                    <FontAwesomeIcon icon={showPassRep ? faEyeSlash : faEye} className={css.eyeIcon} onClick={onShowPassRep} />
                    <p>Passwords doesn't matches</p>
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

