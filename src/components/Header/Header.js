import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';

import css from './Header.module.css';


class Header extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {

        return(

            <header className={css.Header}>
                <div className={css.UserDiv}>
                    <div className={css.User}>
                        <FontAwesomeIcon icon={faUser} className={css.Icon}/>
                    </div>
                </div>

                <div className={css.TodayDiv}>
                    <div className={css.IconDiv}>
                        <FontAwesomeIcon icon={faSun} className={css.SunIcon}/>
                    </div>

                    <div className={css.ScheduleDiv}>
                        <span>Today</span> <span>1</span>
                    </div>
                </div>

                <div className={css.TodayDiv}>
                    <div className={css.IconDiv}>
                        <FontAwesomeIcon icon={faCalendarDay} className={css.TomorrowIcon}/>
                    </div>

                    <div className={css.ScheduleDiv}>
                        <span>Tomorrow</span> <span>1</span>
                    </div>
                </div>

                <div className={css.TodayDiv}>
                    <div className={css.IconDiv}>
                        <FontAwesomeIcon icon={faCalendarWeek} className={css.WeekIcon}/>
                    </div>

                    <div className={css.ScheduleDiv}>
                        <span>This Week</span> <span>1</span>
                    </div>
                </div>


            </header>
        )
    }

}

export default Header;