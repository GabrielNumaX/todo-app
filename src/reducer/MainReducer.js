const initialState = {
    todayTask: [],
    tomorrowTask: [],
    weekTask: [],
  }

  const MainReducer = (previousState = initialState, action) => {
    if(action.type === 'TODAY_TASK'){

      previousState.todayTask = [...action.arrFromState]
       return {...previousState};
    }
    else if (action.type === 'TOMORROW_TASK'){

      previousState.tomorrowTask = [...action.arrFromState]
      return {...previousState}

    }
    else if (action.type === 'WEEK_TASK'){

      previousState.weekTask = [...action.arrFromState]
      return {...previousState}

    }
    return {...previousState}
  }
  
  export default MainReducer;