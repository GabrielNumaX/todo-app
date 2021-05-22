import * as actionTypes from './actionTypes'

const initialState = {
    guestPastTask: [],
    guestTodayTask: [],
    guestTomorrowTask: [],
    guestWeekTask: [],
  }

  const guestReducer = (previousState = initialState, action) => {
    if(action.type === actionTypes.GUEST_PAST_TASK) {

      previousState.guestPastTask = [...action.payload];

      return {...previousState};
    }
    else if(action.type === actionTypes.GUEST_TODAY_TASK){

      previousState.guestTodayTask = [...action.payload]
       return {...previousState};
    }
    else if (action.type === actionTypes.GUEST_TOMORROW_TASK){

      previousState.guestTomorrowTask = [...action.payload]
      return {...previousState}

    }
    else if (action.type === actionTypes.GUEST_WEEK_TASK){

      previousState.guestWeekTask = [...action.payload]
      return {...previousState}
    }
    return {...previousState}
  }
  
  export default guestReducer;