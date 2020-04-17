import React , {useState} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ThinButton from '../Buttons/ThinButton';
import Sticker from '../Stickers/Sticker';

type Props = {
    serviceDate: Date, 
    getFormDate: (date: Date) => any
}


export default function DatePickerAndroid(props : Props){    
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const {getFormDate} = props;
    const startDate = new Date();
    const maxDate = new Date();

    startDate.setHours(0, 0, 0);
    maxDate.setDate(startDate.getDate() + 90);
    maxDate.setHours(0, 0, 0);

    const toggleShow = () => {
        setShow(!show);
    };

    const onChange = (_, selectedDate: Date) => {
        setShow(false);
        setDate(selectedDate);
        getFormDate(selectedDate);
        console.log(show);
    };

    
    return (
        /* * <ThinButton name="Date Picker for Andriod in Development" onClick={() => {getFormDate(new Date());}} /> * */
        <View>
        <ThinButton name='Select Date' onClick={toggleShow}/>
        {show && (<DateTimePicker 
            key='mobile datetime picker'
            value={date}
            minimumDate={startDate}
            maximumDate={maxDate}
            onChange={onChange}
            mode='datetime'   
        />)}
        <Sticker><Text>{date.toDateString()}</Text></Sticker>
        </View>
        );
        
};