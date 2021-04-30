import React, { useState } from 'react';

import css from './Welcome.module.css';

import Login from '../../components/Login/Login';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
import ForgotPass from '../../components/ForgotPass/ForgotPass';

import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';


const Welcome = (props) => {

    const [showComponent, setShowComponent] = useState('login');

    // console.log('welcome');
    // console.log(props);

    return (

        <div className={css.welcome}>
            <WelcomeHeader show={showComponent} onShowLogin={() => setShowComponent('login')}/>
            <div className={css.welcomeContainer}>

                {showComponent === 'login' && 
                    <Login showCreate={() => setShowComponent('create')} 
                            showForgot={() => setShowComponent('forgot')}
                    />}
                {showComponent === 'create' && <CreateAccount show={() => setShowComponent('login')} />}
                {showComponent === 'forgot' && <ForgotPass show={() => setShowComponent('login')}/>}

            </div>
        </div>
    );
}

export default Welcome;