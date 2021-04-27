import React from 'react';

import css from './WelcomeHeader.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const WelcomeHeader = (props) => {

    return (
        <header className={css.welcomeHeader}>


            <div className={css.iconDiv}>

                {
                    props.show !== 'login' &&
                    <div onClick={props.onShow}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} className={css.chevronIcon} />
                        <p>Go Back</p>
                    </div>
                }
            </div>



            <h1>Welcome To Calendarium</h1>



            <div className={css.iconDiv}>

            </div>


        </header>
    );
}

export default WelcomeHeader;