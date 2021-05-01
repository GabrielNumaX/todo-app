import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import css from './Tomorrow.module.css';


class Tomorrow extends Component {
    constructor(props){
        super(props);

        this.state = {

            addTask: {
                    task: '',
                    checked: false,
                },
            todayTask: [],

        }
    }

    componentDidMount() {
    
        // this.setState({
        //     todayTask: [...this.props.tomorrowTask]
        // })
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.todayTask !== this.state.todayTask) {
        //   console.log('pokemons state has changed.')
          this.props.onTomorrowTask(this.state.todayTask)
        }
      }
      

    onChangeTask = (e) => {

        this.setState({
            addTask: {
                task: e.target.value,
                checked: false,
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

        // console.log('render')

        // console.log(this.state);
        
        // const taskArr = this.state.todayTask === undefined ? this.state.todayTask : this.props.tomorrowTask

        const taskArr = this.state.todayTask

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


                                
                                <p className={item.checked ? [css.Ptask, css.PTaskDone].join(' ') : css.PTask}>
                                    {item.task}
                                </p>
                                

                            </div>

                            <FontAwesomeIcon icon={faTrashAlt} 
                                            className={css.Icon}
                                            onClick={() => this.taskDelete(pos)}/>
                        
                    </div>
                )
        })

        const today = Date.now()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return(
            <div className={css.Today}>
               <div className={css.DateNow}>
                   {moment(tomorrow).format('dddd, MMMM Do YYYY')}
               </div>

               <div className={css.TodayTask}>
                      Tomorrow
                </div>

               <div className={css.AddTodayTask}>

                   <div className={css.AddTask}>
                        <FontAwesomeIcon icon={faPlus} 
                                        className={css.Icon}
                                        onClick={this.addTask}
                        />

                        <input placeholder='Add Tomorrow Task' 
                            className={css.Input}
                            value={this.state.addTask.task}
                            onChange={(e) => this.onChangeTask(e)}
                            onKeyUp={this.keyPress}
                            autoFocus={true}>        
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
// const mapGlobalStateToProps = (globalState) => {
//     return {
//         tomorrowTask: globalState.main.tomorrowTask,
//     }
// }


// export default connect(mapGlobalStateToProps, { onTomorrowTask })(Tomorrow);
export default Tomorrow;