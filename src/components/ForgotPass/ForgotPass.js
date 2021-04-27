import React, { useState, useEffect } from 'react';

import css from './ForgotPass.module.css';

const ForgotPass = (props) => {

    return ( 
        <div className={css.formContainer}>

                <h2>Reset Password</h2>

                <form>

                    <div className={css.inputBox}>
                        <label>E-Mail</label>
                        <input type="email" placeholder="Enter your E-Mail" />
                        {/* <p>Username already in use</p> */}
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