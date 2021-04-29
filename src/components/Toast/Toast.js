import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

import css from './Toast.module.css';
import './Icons.css';

import { connect } from 'react-redux';

import { onCloseToast } from '../../containers/App/actions';

const Toast = (props) => {

    // const [show, setShow] = React.useState(props.showToast);

    // console.log('TOAST');

    // console.log(props);

    // React.useEffect(() => {
    //     setShow(props.showToast)
    // }, [props.showToast])

    return (
        <React.Fragment>
            {
                props.showToast &&
                < div className={css.toast} >
                    <FontAwesomeIcon icon={props.icon === 'error' ? faExclamationTriangle : faCheckCircle} />

                    <p>{props.message}</p>

                    <FontAwesomeIcon icon={faTimes} className={css.close} 
                        onClick={props.onCloseToast}
                    />
                </div >
            }
        </React.Fragment>
    );
}

// export default Toast;

const mapStateToProps = state => ({
    showToast: state.app.toastShow,
    message: state.app.toastMessage,
    icon: state.app.toastIcon,
})

export default connect(mapStateToProps, { onCloseToast })(Toast);