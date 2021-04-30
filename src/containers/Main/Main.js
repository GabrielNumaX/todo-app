import React, { Component } from 'react';

import {connect} from 'react-redux';
import { onShowToast } from '../../containers/App/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
        faUser, 
        faUserSecret,
        faSun,
        faCalendarDay,
        faCalendarWeek,
        faFolderOpen,
        } from '@fortawesome/free-solid-svg-icons'



import css from './Main.module.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import Header from '../../components/Header/Header';

import Past from '../../components/Past/Past';
import Today from '../../components/Today/Today';
import Tomorrow from '../../components/Tomorrow/Tomorrow';
import Week from '../../components/Week/Week';

import Toast from '../../components/Toast/Toast';

import moment from 'moment';


class Main extends Component {
    constructor(props){
        super(props);

        this.state = {

            pastShow: false,
            todayShow: true,
            tomorrowShow: false,
            weekShow: false,
            startDate: new Date(),

        }
    }

    // aca en compDidMount obtener todas las tasks y filtar con moment
    // para luego pasarlas a los reducers que cargan en cada uno de los 
    // componentes;
    // VER appReducer -> capaz filtro en el action de App

    handleChange = (date) => {

        // aca prodria validar que la fecha sea dentro de una semana
        // 6 dias mas
        // esto es de Week
        const currentDate = new Date();
        const currentDateMillis = currentDate.getTime();
        const endWeek = new Date(currentDate)
        endWeek.setDate(endWeek.getDate() + 7);
        const endMillis = endWeek.getTime();

        const selectDateMillis = date.getTime();
        
        if(selectDateMillis > endMillis) {

            this.props.onShowToast(`Choose a date between ${moment(currentDate).format('MM/DD')}
                                    and ${moment(endWeek).format('MM/DD')}`, 'error')

            return;
        }
        else if(selectDateMillis < currentDateMillis) {

            this.props.onShowToast('Choose a future date', 'error');

            return;
        }
        else {
            this.setState({
                startDate: date
              });
        }
      };

    setActive = (string) => {

        switch(string){
            case 'past':
                this.setState({
                    pastShow: true,
                    todayShow: false,
                    tomorrowShow: false,
                    weekShow: false,
                })
                break;
            case 'today':
                this.setState({
                    pastShow: false,
                    todayShow: true,
                    tomorrowShow: false,
                    weekShow: false,
                })
                break;
            case 'tomorrow':
                this.setState({
                    pastShow: false,
                    todayShow: false,
                    tomorrowShow: true,
                    weekShow: false,
                })
                break;
            case 'week':
                this.setState({
                    pastShow: false,
                    todayShow: false,
                    tomorrowShow: false,
                    weekShow: true,
                })
                break;
            default: break;
        }
    }

    render() {

        console.log('MAIN');

        return(
            <div className={css.Main}>

                <header className={css.Header}>
                    <div className={css.UserDiv}>
                        <div className={css.User}>
                            <FontAwesomeIcon icon={this.props.userType === 'user' ? faUser : faUserSecret} className={css.Icon}/>
                        </div>
                        <p className={css.UserP}>Username or Guest</p>
                    </div>

                    <div className={css.TodayDiv} 
                        style={this.state.pastShow ? {backgroundColor: 'whitesmoke'} : null}
                        onClick={() => this.setActive('past')}>
                        <div className={css.IconDiv}>
                            <FontAwesomeIcon icon={faFolderOpen} className={css.FolderIcon}/>
                        </div>

                        <div className={css.ScheduleDiv}>
                            <span>Old</span> 
                            {/* this needs to be taken care of */}
                            <span>{this.props.todayTask.length === 0 ? null : this.props.todayTask.length}</span>
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
                            <span>{this.props.todayTask.length === 0 ? null : this.props.todayTask.length}</span>
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
                            <span>{this.props.tomorrowTask.length === 0 ? null : this.props.tomorrowTask.length}</span>
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
                            <span>{this.props.weekTask.length === 0 ? null : this.props.weekTask.length}</span>
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
                    this.state.pastShow ? <Past></Past> : null
                }

                {
                    this.state.todayShow ? <Today></Today> : null
                }

                {
                    this.state.tomorrowShow ? <Tomorrow></Tomorrow> : null
                }

                {
                    this.state.weekShow ? <Week date={this.state.startDate}></Week> : null
                }
    
                <Toast/>
            </div>
        )
    }

}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {

    return {
        todayTask: globalState.main.todayTask,
        tomorrowTask: globalState.main.tomorrowTask,
        weekTask: globalState.main.weekTask,
        userType: globalState.app.userType
    }
}


export default connect(mapGlobalStateToProps, { onShowToast })(Main);
