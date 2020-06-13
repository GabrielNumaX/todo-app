import React, { Component } from 'react';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import css from './Week.module.css';


class Week extends Component {
    constructor(props){
        super(props);

        this.state = {

            addTask: {
                    task: '',
                    checked: false,
                    date: ''
                },
            todayTask: [],

        }
    }

    componentDidMount() {
    
        this.setState({
            todayTask: [...this.props.weekTask]
        })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.todayTask !== this.state.todayTask) {
        //   console.log('pokemons state has changed.')
          this.props.updateWeekTask(this.state.todayTask)
        }
    }

    // shouldComponentUpdate(nextProps, nextState){

    //     if(nextProps.date !== this.props.date || nextState.todayTask !== this.state.todayTask){

    //         return true;
    //     }
        
    // }
      

    onChangeTask = (e) => {

        this.setState({
            addTask: {
                task: e.target.value,
                checked: false,
                date: this.props.date,
            }
        })
    }

    keyPress = (e) => {

        if(e.keyCode === 13){

            this.setState({
                todayTask: [...this.state.todayTask, this.state.addTask]
            })

            this.setState({
                addTask: {
                    task: '',
                }
            })
        }
    }

    addTask = () => {

        this.setState( prevState => ({
            todayTask: [...prevState.todayTask, this.state.addTask],
            addTask: {
                task: '',
            }
        }))
    }

    onCheck = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.map((item, index) => {

            if(index === pos){

                return item.checked = !item.checked;
            }

            return todayArr;
        })

        this.setState({todayTask: [...todayArr]});
    }

    taskDelete = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.splice(pos, 1)

        this.setState({todayTask: [...todayArr]});
    }

    render() {

        // console.log('week')

        // // console.log(this.props.date);
        // console.log(this.state.todayTask)
        
        const taskArr = this.state.todayTask === undefined ? this.state.todayTask : this.props.weekTask

        const task = taskArr.map((item, pos) => {
            return(
                    <div key={pos} className={css.Task}>

                        <div className={css.TaskInner}>
                                <FontAwesomeIcon icon={item.checked ? 
                                                        faCheckCircle 
                                                        : faCircle
                                                    } 
                                    className={css.Icon}
                                    onClick={() => this.onCheck(pos)}
                                />


                                
                                <p className={css.PTask}>
                                    {item.task}
                                </p>
                                

                            </div>
                            
                            <div className={css.DivDateAndTrash}>
                            <span>{moment(item.date).format('MMM Do')}</span>

                            <FontAwesomeIcon icon={faTrashAlt} 
                                            className={css.Icon}
                                            onClick={() => this.taskDelete(pos)}/>

                            </div>
                    </div>
                )
        })

        return(
            <div className={css.Today}>
               <div className={css.DateNow}>
                   {`Week ${moment().week()} of ${moment().weekYear()}`}
               </div>

               <div className={css.TodayTask}>
                      This Week
                </div>

               <div className={css.AddTodayTask}>

                   <div className={css.AddTask}>
                        <FontAwesomeIcon icon={faPlus} 
                                        className={css.Icon}
                                        onClick={this.addTask}
                        />

                        <input placeholder='Select Date and Add Week Task' 
                            className={css.Input}
                            value={this.state.addTask.task}
                            onChange={(e) => this.onChangeTask(e)}
                            onKeyUp={this.keyPress}>        
                        </input>

                   </div>

                   <div className={css.TaskContainer}>

                        {task}

                   </div>

               </div>


            </div>
        )
    }

}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {
    return {
        weekTask: globalState.weekTask,
    }
}

// this writes to STORE
const mapDispatchToProps = (dispatch) => {
    return {
	//NOMBRE PROP - NOM PARAM
        updateWeekTask: (arr) => {
 			//nom ACTION	nom-param reducer
            dispatch({type: 'WEEK_TASK', arrFromState: arr})        
        },
    }
}
export default connect(mapGlobalStateToProps, mapDispatchToProps)(Week);
