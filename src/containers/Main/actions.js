import * as actionTypes from './actionTypes';

export const TODAY_TASK = 'TODAY_TASK';

export const TOMORROW_TASK = 'TOMORROW_TASK';

export const WEEK_TASK = 'WEEK_TASK';

export const todayTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.TODAY_TASK,
        payload: arr
    })
}

export const tomorrowTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.TOMORROW_TASK,
        payload: arr
    })
}

export const weekTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.WEEK_TASK,
        payload: arr
    })
}