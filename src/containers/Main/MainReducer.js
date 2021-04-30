import * as actionTypes from './actionTypes'

const initialState = {
    pastTask: [],
    todayTask: [],
    tomorrowTask: [],
    weekTask: [],
  }

  const mainReducer = (previousState = initialState, action) => {
    if(action.type === actionTypes.PAST_TASK) {

      previousState.pastTask = [...action.payload];

      return previousState;
    }
    else if(action.type === actionTypes.TODAY_TASK){

      previousState.todayTask = [...action.payload]
       return {...previousState};
    }
    else if (action.type === actionTypes.TOMORROW_TASK){

      previousState.tomorrowTask = [...action.payload]
      return {...previousState}

    }
    else if (action.type === actionTypes.WEEK_TASK){

      previousState.weekTask = [...action.payload]
      return {...previousState}
    }
    return {...previousState}
  }
  
  export default mainReducer;