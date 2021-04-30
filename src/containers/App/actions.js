import * as actionTypes from './actionTypes';

export const setLogInOut = (bool) => dispatch => {
    dispatch({
        type: actionTypes.SET_LOG_IN_OUT,
        payload: bool
    })
}

export const onShowToast = (msg, icon) => dispatch => {
    dispatch({
        type: actionTypes.SHOW_TOAST,
        show: true,
        message: msg,
        icon: icon,
    })

    setTimeout(() => {
        dispatch({
            type: actionTypes.SHOW_TOAST,
            show: false,
            message: '',
            icon: '',
        });
    },3000)
}

export const onCloseToast = () => dispatch => {
    dispatch({
        type: actionTypes.SHOW_TOAST,
        show: false,
        message: '',
        icon: '',
    })
}

export const onSetUserType = (type) => dispatch => {
    dispatch({
        type: actionTypes.SET_USER_TYPE,
        payload: type,
    })
}
