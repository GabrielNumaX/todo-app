import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import css from './Week.module.css';


class Week extends Component {
    constructor(props) {
        super(props);

        this.state = {

            addTask: {
                task: '',
                checked: false,
                date: null,
            },
            todayTask: [],

        }
    }

    componentDidMount() {

        this.setState({
            todayTask: [...this.props.weekTask],
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todayTask !== this.state.todayTask) {

            this.props.resetDate();

            // const sortedWeek = this.state.todayTask.sort((a, b) =>
            //     (a.date > b.date) ? 1
            //         : ((b.date > a.date) ? -1 : 0)
            // )

            localStorage.setItem('week-task', JSON.stringify(this.state.todayTask))
        }
    }


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

        if (e.keyCode === 13) {

            if (this.state.addTask.task === '') {

                return;
            }

            const weekToSort = [...this.state.todayTask, this.state.addTask];

            // console.log('weekToSort', weekToSort);

            const sortedWeek = weekToSort.sort((a, b) =>
                (new Date(a.date) > new Date(b.date)) ? 1
                    : ((new Date(b.date) > new Date(a.date)) ? -1 : 0)
            )

            // console.log('sortedWeek', sortedWeek);

            this.setState({
                // todayTask: [...this.state.todayTask, this.state.addTask],
                todayTask: [...sortedWeek],
                addTask: {
                    ...this.state.addTask,
                    task: '',
                    checked: false,
                }
            })
        }
    }

    addTask = () => {

        if (this.state.addTask.task === '') {

            return;
        }

        const weekToSort = [...this.state.todayTask, this.state.addTask];

        const sortedWeek = weekToSort.sort((a, b) =>
            (new Date(a.date) > new Date(b.date)) ? 1
                : ((new Date(b.date) > new Date(a.date)) ? -1 : 0)
        )   

        this.setState({
            // todayTask: [...this.state.todayTask, this.state.addTask],
            todayTask: [...sortedWeek],
            addTask: {
                ...this.state.addTask,
                task: '',
                checked: false,
            }
        })
    }

    onCheck = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.map((item, index) => {

            if (index === pos) {

                return item.checked = !item.checked;
            }

            return todayArr;
        })

        this.setState({ todayTask: [...todayArr] });
    }

    taskDelete = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.splice(pos, 1)

        this.setState({ todayTask: [...todayArr] });
    }

    render() {

        // const taskArr = this.state.todayTask === undefined ? this.state.todayTask : this.props.weekTask

        const taskArr = this.state.todayTask

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

        const today = Date.now()
        const endWeek = new Date(today)
        endWeek.setDate(endWeek.getDate() + 7)

        return (
            <div className={css.Today}>
                <div className={css.DateNow}>
                    {`${moment(Date.now()).format('Do MMM')} - ${moment(endWeek).format('Do MMM')}`}
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
//         weekTask: globalState.main.weekTask,
//     }
// }

// export default connect(mapGlobalStateToProps, { onWeekTask })(Week);
export default Week;