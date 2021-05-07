import React, { useState } from 'react';

import { connect } from 'react-redux';
import { onShowToast } from '../../containers/App/actions';

import css from './ForgotPass.module.css';

import PulseLoader from '../PulseLoader/PulseLoader';
import Toast from '../Toast/Toast';

import axios from 'axios';


const ForgotPass = (props) => {

    const [email, setEmail] = useState({
        isInvalid: null,
        message: '',
        email: '',
    });

    const [showPulse, setShowPulse] = useState(false);

    const validateEmail = (email) => {

        // console.log(email);


        if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            return true;
        }

        return false;
    }

    const valEmail = () => {

        if (!validateEmail(email.email)) {

            setEmail({
                ...email,
                isInvalid: true,
                message: 'Please enter a valid Email'
            })
        }
        else {

            setEmail({
                ...email,
                isInvalid: false,
                message: ''
            })
        }
    }



    const onResetPassword = (e) => {

        e.preventDefault();

        if (!validateEmail(email.email)) {

            setEmail({
                ...email,
                isInvalid: true,
                message: 'Please enter a valid Email',
            })

            return;
        }

        setShowPulse(true);

        // handle axios call
        axios({
            method: 'post',
            url: '/password/request',
            data: {
                email: email.email
            }
        })
            .then(res => {

                setShowPulse(false);

                setEmail({
                    isInvalid: null,
                    message: '',
                    email: '',
                })

                props.onShowToast('Email Sent', 'success');
            })
            .catch(error => {

                setShowPulse(false);

                if(error.response.data?.message) {

                    props.onShowToast(error.response.data.message, 'error');

                    return;
                }

                props.onShowToast('Something went wrong. Try Again!!!', 'error');
            })
    }

    return (
        <React.Fragment>
            <div className={css.formContainer}>

                <h2>Reset Password</h2>

                <form onSubmit={onResetPassword}>

                    <div className={css.inputBox}>
                        <label>E-Mail</label>
                        <input type="email" placeholder="Enter your E-Mail"
                            onChange={(e) => setEmail({ ...email, email: e.target.value })}
                            onBlur={valEmail}
                        />
                        {email.isInvalid &&
                            <p>{email.message}</p>
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
            <Toast />
        </React.Fragment>
    );
}

export default connect(null, { onShowToast })(ForgotPass);