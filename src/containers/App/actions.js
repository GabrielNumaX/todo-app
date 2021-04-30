import * as actionTypes from './actionTypes';
import axios from 'axios';

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
    },5000)
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

export const postTask = (task) => dispatch => {

    axios({
        method:'post',
        url: '/task',
        data: {
            task: task,
        }
    })
    .then(res => {
        console.log(res.data);

        onShowToast('Task added', 'success');
    })
    .catch(error => {

        onShowToast('Something went wrong. Try Again!!!', 'error');

        console.log(error);
        console.log(error.response);
    })
}


export const delTask = (id) => dispatch => {

    axios({
        method:'delete',
        url: '/task',
        data: {
            taskId: id,
        }
    })
    .then(res => {
        console.log(res.data);

        onShowToast('Task Deleted', 'success');
    })
    .catch(error => {

        onShowToast('Something went wrong. Try Again!!!', 'error');

        console.log(error);
        console.log(error.response);
    })
}


export const getAllTasks = () => dispatch => {
    axios({
        method:'get',
        url: '/task',
    })
    .then(res => {
        console.log(res.data);

        // tambien podria filtar las tasks con moment query methods aca 
        // y asignarlas a los reducers
        // hacer dispatch({
        //     type: 'PAST_TASK',
        //     payload: filteredArray
        // })

    })
    .catch(error => {

        onShowToast('Something went wrong. Try Again!!!', 'error');

        console.log(error);
        console.log(error.response);
    })
}
