import React, { useState, useEffect } from 'react';

import css from './ForgotPass.module.css';

const ForgotPass = (props) => {

    const [email, setEmail] = useState({
        isInvalid: null,
        message: '',
        email: '',
    });

    const validateEmail = (email) => {

        console.log(email);


        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
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

        if(!validateEmail(email.email)) {

            setEmail({
                ...email,
                isInvalid: true,
                message: 'Please enter a valid Email',
            })

            return;
        }

        // handle axios call
    }

    return (
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
                    {/* <div className={css.loader}>
                            <PulseLoader/>
                        </div> */}
                </div>
            </form>

        </div>
    );
}

export default ForgotPass;