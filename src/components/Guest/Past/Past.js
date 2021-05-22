import React, { Component } from 'react';

import {connect} from 'react-redux';
import { onGuestPastTask } from '../../../containers/Guest/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import css from './Past.module.css';


class Past extends Component {
    constructor(props) {
        super(props);

        this.state = {

            addTask: {
                task: '',
                checked: false,
            },
            pastTask: [],

            hasPastTasks: false,

        }
    }

    componentDidMount() {

        let hasPast = false;

        if (Array.isArray(this.props.pastTask) && this.props.pastTask.length) {

            hasPast = true;
        }

        this.setState({
            pastTask: [...this.props.pastTask],
            hasPastTasks: hasPast,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pastTask !== this.state.pastTask) {

            // console.log('didUp Past')

            localStorage.setItem('past-task', JSON.stringify(this.state.pastTask));

            this.props.onGuestPastTask(this.state.pastTask);


        }
    }



    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.pastTask !== this.state.pastTask) {
    //         //   console.log('pokemons state has changed.')
    //         this.props.onPastTask(this.state.pastTask)
    //     }
    // }


    onChangeTask = (e) => {

        this.setState({
            addTask: {
                task: e.target.value,
                checked: false,
            }
        })
    }

    keyPress = (e) => {

        if (e.keyCode === 13) {

            this.setState({
                pastTask: [...this.state.pastTask, this.state.addTask]
            })

            this.setState({
                addTask: {
                    task: '',
                }
            })
        }
    }

    addTask = () => {

        this.setState(prevState => ({
            pastTask: [...prevState.pastTask, this.state.addTask],
            addTask: {
                task: '',
            }
        }))
    }

    onCheck = (pos) => {

        let pastArr = [...this.state.pastTask]

        pastArr.map((item, index) => {

            if (index === pos) {

                return item.checked = !item.checked;
            }

            return pastArr;
        })

        this.setState({ pastTask: [...pastArr] });
    }

    taskDelete = (pos) => {

        let pastArr = [...this.state.pastTask]

        pastArr.splice(pos, 1)

        this.setState({ pastTask: [...pastArr] });
    }

    render() {

        // console.log('PAST');

        // const taskArr = this.state.pastTask === undefined ? this.state.pastTask : this.props.pastTask

        const taskArr = this.state.pastTask

        const task = taskArr.map((item, pos) => {
            return (
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

                    <div className={css.DivDateAndTrash}>
                        <span>{moment(item.date).format('MMM Do')}</span>

                        <FontAwesomeIcon icon={faTrashAlt}
                            className={css.Icon}
                            onClick={() => this.taskDelete(pos)} />

                    </div>

                </div>
            )
        })

        return (

            <div className={css.Today}>
                <div className={css.DateNow}>
                    {moment(Date.now()).format('dddd, MMMM Do YYYY')}
                </div>

                <div className={css.TodayTask}>
                    Old Tasks
                </div>

                {

                    !this.state.hasPastTasks ?

                        <div className={css.NoOldTasks}>
                            You have no Old Task. <br />
                            Your Old Tasks will be deleted after 30 days
                        </div>

                        :
                        null
                }
                {/* NO addind OLD TASKS */}

                <div className={css.AddTodayTask}>

                    <div className={css.TaskContainer}>

                        {task}

                        {/* <div className={css.NoOldTasks}>
                            You have no Old Task. <br/>
                            Your Old Task will be deleted after 30 days
                        </div> */}

                    </div>

                </div>


            </div>
        )
    }

}

// // this reads from STORE
// const mapGlobalStateToProps = (globalState) => {
//     return {
//         pastTask: globalState.main.pastTask,
//     }
// }

// export default connect(mapGlobalStateToProps, { onPastTask, delTask, setCheckUncheck })(Past);
// export default Past;
export default connect(null, { onGuestPastTask })(Past);