import * as actionTypes from './actionTypes';

export const onPastTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.PAST_TASK,
        payload: arr
    })
}

export const onTodayTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.TODAY_TASK,
        payload: arr
    })
}

export const onTomorrowTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.TOMORROW_TASK,
        payload: arr
    })
}

export const onWeekTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.WEEK_TASK,
        payload: arr
    })
}