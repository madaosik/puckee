import React, { useState } from "react"
import Calendar from 'react-calendar'

// import './calendar.less';
import 'react-calendar/dist/Calendar.css'

export const MyCalendar : React.FC = () => {
    const [value, onChange] = useState(new Date())

    return (
        <div className="content-inner-box">
            <div className="content-inner-row heading">
                <h4>Kalendář</h4>
            </div>
            <div className="content-inner-row data">
                <Calendar onChange={()=> {}} showWeekNumbers value={value} />
            </div>
        </div>
    )
}

// const styles = {
//     brand: {
//         marginBottom: '5px',
//         marginLeft: '0.5rem',
//         // marginRight: '1rem'
//     }
// }
