import * as actionTypes from './actionTypes'

const initialState = {
    todayTask: [],
    tomorrowTask: [],
    weekTask: [],
  }

  const mainReducer = (previousState = initialState, action) => {
    if(action.type === actionTypes.TODAY_TASK){

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