const initialState = {
    todayTask: [],
    tomorrowTask: [],
  }

  const MainReducer = (previousState = initialState, action) => {
    if(action.type === 'TODAY_TASK'){

      previousState.todayTask = [...action.arrFromState]
       return {...previousState};
    }

    else if (action.type === 'DELETE_TODAY_TASK'){

    //   const newState = [...previousState.todayTask]

    //   newState.splice(action.index, 1)

    previousState.todayTask = delete previousState.todayTask[action.index]

      return {...previousState}
    }

    else if (action.type === 'TOMORROW_TASK'){

        previousState.tomorrowTask = [...action.arrFromState]
    }
    return {...previousState}
  }
  
  export default MainReducer;