import React from 'react';


type Props = {
    serviceDate: Date, 
    getFormDate: (date: Date) => any
}

export default function DatePicker(props: Props){
    const {getFormDate} = props;
    const fakeDate = new Date(2020, 3, 11, 9, 30, 0, 0);
    getFormDate(fakeDate);
    return <></>;
}