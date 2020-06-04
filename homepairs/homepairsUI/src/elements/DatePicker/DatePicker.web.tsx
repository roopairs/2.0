import React from 'react';
import {DateTimePicker} from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import './pickerStyle.css';

Moment.locale('en');
momentLocalizer();

type Props = {
    serviceDate: Date, 
    getFormDate: (date: Date) => any
}

export default function DatePickerWeb(props: Props){

    const {serviceDate, getFormDate} = props;
    const startDate = new Date();
    const maxDate = new Date();

    startDate.setHours(0, 0, 0);
    maxDate.setDate(startDate.getDate() + 90);
    maxDate.setHours(0, 0, 0);

    return <DateTimePicker 
        containerClassName="dateTime"
        key='web datetime picker'
        dropDown
        value={serviceDate}
        onChange={value => getFormDate(value)}
        min={startDate}
        step={15}
        time />;
}