import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

import css from './Toast.module.css';
import iconCss from './Icons.module.css';

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
                    <FontAwesomeIcon icon={props.icon === 'error' ? faExclamationTriangle : faCheckCircle} 
                        className={props.icon === 'error' ? iconCss.exclamationTriangle : iconCss.checkCircle}
                    />

                    <p>{props.message}</p>

                    <FontAwesomeIcon icon={faTimes} className={iconCss.times} 
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