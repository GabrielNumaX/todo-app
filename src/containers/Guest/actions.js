import * as actionTypes from './actionTypes';


export const onGuestPastTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.GUEST_PAST_TASK,
        payload: arr
    })
}

export const onGuestTodayTask = (arr) => dispatch => {

    dispatch({
        type: actionTypes.GUEST_TODAY_TASK,
        payload: arr
    })
}

export const onGuestTomorrowTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.GUEST_TOMORROW_TASK,
        payload: arr
    })
}

export const onGuestWeekTask = (arr) => dispatch => {
    dispatch({
        type: actionTypes.GUEST_WEEK_TASK,
        payload: arr
    })
}

