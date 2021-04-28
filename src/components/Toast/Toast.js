import React, { useState, useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

import css from './Toast.module.css';
import './Icons.css';

const Toast = (props) => {

    const [show, setShow] = React.useState(props.showToast);

    // React.useEffect(() => {
    //     setShow(props.showToast)
    // },[props.showToast])

    return ( 

        <div className={css.toast}>

            <FontAwesomeIcon icon={faExclamationTriangle} />

            <p>This is Toast Message with super long text</p>

            <FontAwesomeIcon icon={faTimes} className={css.close}/>


        </div>
     );
}
 
export default Toast;