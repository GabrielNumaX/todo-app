import React, { Component } from 'react';

import { connect } from 'react-redux';
import { onShowToast } from '../App/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faUserSecret,
    faSun,
    faCalendarDay,
    faCalendarWeek,
    faFolderOpen,
    faBars,
    faTimes
} from '@fortawesome/free-solid-svg-icons'



import css from './Guest.module.css';

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
// import DatePicker from 'react-modern-calendar-datepicker';

import { enUS } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
import '../../assets/style.css';

import Past from '../../components/Guest/Past/Past';
import Today from '../../components/Guest/Today/Today';
import Tomorrow from '../../components/Guest/Tomorrow/Tomorrow';
import Week from '../../components/Guest/Week/Week';

import Toast from '../../components/Toast/Toast';

import PageLoader from '../../components/PageLoader/PageLoader';

import moment from 'moment';


class Guest extends Component {
    constructor(props) {
        super(props);

        this.state = {

            pastShow: false,
            todayShow: true,
            tomorrowShow: false,
            weekShow: false,
            startDate: new Date(),

            showLoader: true,

            toggleDropdown: false,

            pastTask: [],
            todayTask: [],
            tomorrowTask: [],
            weekTask: [],

            toggleHeader: false,

        }
    }

    // aca en compDidMount obtener todas las tasks y filtar con moment
    // para luego pasarlas a los reducers que cargan en cada uno de los 
    // componentes;
    // VER appReducer -> capaz filtro en el action de App


    componentDidMount() {

        // console.log('GUEST didMount');

        const pastLocal = JSON.parse(localStorage.getItem('past-task'));
        const todayLocal = JSON.parse(localStorage.getItem('today-task'))
        const tomorrowLocal = JSON.parse(localStorage.getItem('tomorrow-task'))
        const weekLocal = JSON.parse(localStorage.getItem('week-task'))

        // console.log('tomorrow LOCAL', tomorrowLocal);

        // console.log('week LOCAL', weekLocal);

        const week = [];
        const tomorrow = [];
        const today = [];
        const past = [];

        const thisDay = moment(new Date()).format('YYYY-MM-DD');

        if (pastLocal) {

            pastLocal.map(item => {


                const itemDate = moment(new Date(item.date)).format('YYYY-MM-DD');

                const dayTomorrow = moment(thisDay).add(1, 'd');

                if (moment(dayTomorrow).isBefore(itemDate)) {

                    return week.push(item);
                }


                if (moment(dayTomorrow).isSame(itemDate)) {

                    week.push(item);

                    return tomorrow.push(item);
                }


                if (moment(itemDate).isSame(thisDay)) {

                    return today.push(item);
                }

                if (moment(thisDay).isAfter(itemDate)) {

                    return past.push(item);
                }

                return null;
            })

        }

        if (todayLocal) {

            todayLocal.map(item => {

                const itemDate = moment(new Date(item.date)).format('YYYY-MM-DD');

                const dayTomorrow = moment(thisDay).add(1, 'd');

                if (moment(dayTomorrow).isBefore(itemDate)) {

                    return week.push(item);
                }


                if (moment(dayTomorrow).isSame(itemDate)) {

                    week.push(item);

                    return tomorrow.push(item);
                }


                if (moment(itemDate).isSame(thisDay)) {

                    console.log('isSame(thisDay)')

                    return today.push(item);
                }

                if (moment(thisDay).isAfter(itemDate)) {

                    return past.push(item);
                }

                return null;
            })

        }

        if (tomorrowLocal) {

            tomorrowLocal.map(item => {


                const itemDate = moment(new Date(item.date)).format('YYYY-MM-DD');

                const dayTomorrow = moment(thisDay).add(1, 'd');

                if (moment(dayTomorrow).isBefore(itemDate)) {

                    return week.push(item);
                }


                if (moment(dayTomorrow).isSame(itemDate)) {

                    week.push(item);

                    return tomorrow.push(item);
                }


                if (moment(itemDate).isSame(thisDay)) {

                    return today.push(item);
                }

                if (moment(thisDay).isAfter(itemDate)) {

                    return past.push(item);
                }

                return null;
            })

        }

        if (weekLocal) {

            weekLocal.map(item => {


                const itemDate = moment(new Date(item.date)).format('YYYY-MM-DD');

                const dayTomorrow = moment(thisDay).add(1, 'd');

                if (moment(dayTomorrow).isBefore(itemDate)) {

                    return week.push(item);
                }


                // if (moment(dayTomorrow).isSame(itemDate)) {

                //     // week.push(item);

                //     // return tomorrow.push(item);

                //     return week.push(item);
                // }


                if (moment(itemDate).isSame(thisDay)) {

                    return today.push(item);
                }

                if (moment(thisDay).isAfter(itemDate)) {

                    return past.push(item);
                }

                return null;
            })

        }


        // const sortedWeek = week.sort((a, b) => 
        //     (a.date > b.date) ? 1 
        //     : ((b.date > a.date) ? -1 : 0)
        // )

        const sortedWeek = week.sort((a, b) =>
            (new Date(a.date) > new Date(b.date)) ? 1
                : ((new Date(b.date) > new Date(a.date)) ? -1 : 0)
        )

        this.setState({
            showLoader: false,
            pastTask: [...past],
            todayTask: [...today],
            tomorrowTask: [...tomorrow],
            // weekTask: [...week],
            weekTask: [...sortedWeek],
        })

    }

    resetDate = () => {

        this.setState({
            startDate: new Date(),
        })
    }

    handleChange = (date) => {

        // console.log(date);

        // aca prodria validar que la fecha sea dentro de una semana
        // 6 dias mas
        // esto es de Week
        const currentDate = new Date();
        const currentDateMillis = currentDate.getTime();
        const endWeek = new Date(currentDate)
        endWeek.setDate(endWeek.getDate() + 7);
        const endMillis = endWeek.getTime();

        const selectDateMillis = date.getTime();

        if (selectDateMillis > endMillis) {

            this.props.onShowToast(`Choose a date between ${moment(currentDate).format('MM/DD')}
                                    and ${moment(endWeek).format('MM/DD')}`, 'error')

            return;
        }
        else if (selectDateMillis < currentDateMillis) {

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

        switch (string) {
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

    logOut = () => {

        // this.props.setLogInOut(false);
        // this.props.setUsername(null);
        // this.props.setUserType('guest');
        // localStorage.clear();

        this.props.history.push('/');
    }

    toggleHeader = () => {

        this.setState(prevState => ({

            toggleHeader: !prevState.toggleHeader,
        }))
    }

    render() {

        // console.log('GUEST');

        return (

            <PageLoader visible={this.state.showLoader} >
                <div className={css.Main}
                // onClick={this.state.toggleHeader ? this.toggleHeader : null}   
                >

                    <div className={css.HeaderToogle}>

                        <div className={css.HamburguerContainer}
                            onClick={this.toggleHeader}
                        >

                            <FontAwesomeIcon icon={faBars} className={css.IconHamburguer} />

                        </div>
                    </div>

                    <header className={this.state.toggleHeader ? [css.Header, css.HeaderShow].join(' ') : css.Header}>
                        <div className={css.UserDiv}>
                            <div
                                // className={css.User} 
                                className={[css.User, css.IsUser].join(' ')}
                                onClick={() => this.setState(prevState => ({
                                    toggleDropdown: !prevState.toggleDropdown
                                }))}>
                                <FontAwesomeIcon icon={this.props.userType === 'user' ? faUser : faUserSecret} className={css.Icon} />
                            </div>
                            {
                                this.state.toggleDropdown ?

                                    <div className={css.Dropdown} onClick={this.logOut}>

                                        <p>Home Page</p>

                                    </div>

                                    :

                                    null
                            }
                            {
                                this.props.username
                                    ?
                                    <p className={css.UserP}>{this.props.username}</p>
                                    :
                                    <p className={css.UserP}>Guest User</p>
                            }

                            {
                                this.state.toggleHeader &&
                                <FontAwesomeIcon icon={faTimes} className={css.times}
                                    onClick={this.toggleHeader}
                                />
                            }
                        </div>

                        <div className={css.TodayDiv}
                            style={this.state.pastShow ? { backgroundColor: 'whitesmoke' } : null}
                            onClick={() => this.setActive('past')}>
                            <div className={css.IconDiv}>
                                <FontAwesomeIcon icon={faFolderOpen} className={css.FolderIcon} />
                            </div>

                            <div className={css.ScheduleDiv}>
                                <span>Old</span>
                                {/* <span>{this.props.pastTask.length === 0 ? null : this.props.pastTask.length}</span> */}
                            </div>
                        </div>

                        <div className={css.TodayDiv}
                            style={this.state.todayShow ? { backgroundColor: 'whitesmoke' } : null}
                            onClick={() => this.setActive('today')}>
                            <div className={css.IconDiv}>
                                <FontAwesomeIcon icon={faSun} className={css.SunIcon} />
                            </div>

                            <div className={css.ScheduleDiv}>
                                <span>Today</span>
                                {/* <span>{this.props.todayTask.length === 0 ? null : this.props.todayTask.length}</span> */}
                            </div>
                        </div>

                        <div className={css.TodayDiv}
                            style={this.state.tomorrowShow ? { backgroundColor: 'whitesmoke' } : null}
                            onClick={() => this.setActive('tomorrow')}>
                            <div className={css.IconDiv}>
                                <FontAwesomeIcon icon={faCalendarDay} className={css.TomorrowIcon} />
                            </div>

                            <div className={css.ScheduleDiv}>
                                <span>Tomorrow</span>
                                {/* <span>{this.props.tomorrowTask.length === 0 ? null : this.props.tomorrowTask.length}</span> */}
                            </div>
                        </div>

                        <div className={css.TodayDiv}
                            style={this.state.weekShow ? { backgroundColor: 'whitesmoke' } : null}
                            onClick={() => this.setActive('week')}>
                            <div className={css.IconDiv}>
                                <FontAwesomeIcon icon={faCalendarWeek} className={css.WeekIcon} />
                            </div>

                            <div className={css.ScheduleDiv}>
                                <span>This Week</span>
                                {/* <span>{this.props.weekTask.length === 0 ? null : this.props.weekTask.length}</span> */}
                            </div>
                        </div>

                        <div className={css.DatePickerDiv}>

                            {this.state.weekShow ?

                                // <DatePicker
                                //     selected={this.state.startDate}
                                //     onChange={this.handleChange}
                                //     className={css.DatePicker}
                                // />
                                <DatePicker date={this.state.startDate} onDateChange={this.handleChange} locale={enUS}>
                                    {({ inputProps, focused }) => (
                                        <input
                                            className={'input' + (focused ? ' -focused' : '')}
                                            {...inputProps}
                                        />
                                    )}
                                </DatePicker>
                                :
                                null
                            }

                        </div>
                    </header>

                    {
                        this.state.pastShow ? <Past></Past> : null
                    }

                    {
                        this.state.todayShow ? <Today todayTask={this.state.todayTask} /> : null
                    }

                    {
                        this.state.tomorrowShow ? <Tomorrow tomorrowTask={this.state.tomorrowTask} /> : null
                    }

                    {
                        this.state.weekShow ?
                            <Week date={this.state.startDate}
                                resetDate={this.resetDate}
                                weekTask={this.state.weekTask} /> : null
                    }

                    <Toast />
                </div>
            </PageLoader>
        )
    }

}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {

    return {
        userType: globalState.app.userType,
    }
}


export default connect(mapGlobalStateToProps, { onShowToast })(Guest);
