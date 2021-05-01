import React from 'react';

import css from './WelcomeHeader.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons';

import { useHistory } from 'react-router';

const WelcomeHeader = (props) => {
    
    const history = useHistory();

    return (
        <header className={css.welcomeHeader}>


            <div className={css.iconDiv}>

                {
                    props.show !== 'login' &&
                    <div onClick={props.onShowLogin}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} className={css.chevronIcon} />
                        <p>Go Back</p>
                    </div>
                }
            </div>



            <h1>Welcome To Calendarium</h1>



            <div className={css.iconDivSecret} onClick={() => history.push('/guest')}>

                <div className={css.guestDiv}>
                    <p>Guest User</p>
                </div>

                <div className={css.iconContainer}>
                    <FontAwesomeIcon icon={faUserSecret} className={css.icon} />
                </div>

            </div>


        </header>
    );
}

export default WelcomeHeader;