import React, { Component } from 'react';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import css from './Main.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Header from '../../components/Header/Header';

import Today from '../../components/Today/Today';
import Tomorrow from '../../components/Tomorrow/Tomorrow';
import Week from '../../components/Week/Week';


class Main extends Component {
    constructor(props){
        super(props);

        this.state = {

            todayShow: true,
            tomorrowShow: false,
            weekShow: false,
            startDate: new Date(),

        }
    }

    handleChange = (date) => {
        this.setState({
          startDate: date
        });
      };

    setActive = (string) => {

        switch(string){
            case 'today':
                this.setState({
                    todayShow: true,
                    tomorrowShow: false,
                    weekShow: false,
                })
                break;
            case 'tomorrow':
                this.setState({
                    todayShow: false,
                    tomorrowShow: true,
                    weekShow: false,
                })
                break;
            case 'week':
                this.setState({
                    todayShow: false,
                    tomorrowShow: false,
                    weekShow: true,
                })
                break;
            default: break;
        }
    }

    render() {

        return(
            <div className={css.Main}>

                <header className={css.Header}>
                    <div className={css.UserDiv}>
                        <div className={css.User}>
                            <FontAwesomeIcon icon={faUser} className={css.Icon}/>
                        </div>
                    </div>

                    <div className={css.TodayDiv} 
                        style={this.state.todayShow ? {backgroundColor: 'whitesmoke'} : null}
                        onClick={() => this.setActive('today')}>
                        <div className={css.IconDiv}>
                            <FontAwesomeIcon icon={faSun} className={css.SunIcon}/>
                        </div>

                        <div className={css.ScheduleDiv}>
                            <span>Today</span> 
                            {/* <span>{this.props.todayTask.length}</span> */}
                        </div>
                    </div>

                    <div className={css.TodayDiv} 
                        style={this.state.tomorrowShow ? {backgroundColor: 'whitesmoke'} : null}
                        onClick={() => this.setActive('tomorrow')}>
                        <div className={css.IconDiv}>
                            <FontAwesomeIcon icon={faCalendarDay} className={css.TomorrowIcon}/>
                        </div>

                        <div className={css.ScheduleDiv}>
                            <span>Tomorrow</span> 
                            {/* <span>{this.props.tomorrowTask.length}</span> */}
                        </div>
                    </div>

                    <div className={css.TodayDiv} 
                        style={this.state.weekShow ? {backgroundColor: 'whitesmoke'} : null}
                        onClick={() => this.setActive('week')}>
                        <div className={css.IconDiv}>
                            <FontAwesomeIcon icon={faCalendarWeek} className={css.WeekIcon}/>
                        </div>

                        <div className={css.ScheduleDiv}>
                            <span>This Week</span> 
                            {/* <span>{this.props.weekTask.length}</span> */}
                        </div>
                    </div>

                    <div className={css.DatePickerDiv}>

                    { this.state.weekShow ?

                        <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        />
                        :
                        null
                    }
                    
                    </div>
                </header>

                {
                    this.state.todayShow ? <Today></Today> : null
                }

                {
                    this.state.tomorrowShow ? <Tomorrow></Tomorrow> : null
                }

                {
                    this.state.weekShow ? <Week date={this.state.startDate}></Week> : null
                }


            </div>
        )
    }

}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {

    return {
        todayTask: globalState.main.todayTask,
        tomorrowTask: globalState.main.tomorrowTask,
        weekTask: globalState.main.weekTask
    }
}


export default connect(mapGlobalStateToProps, null)(Main);
