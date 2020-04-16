import React , {useState} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
    serviceDate: Date, 
    getFormDate: (date: Date) => any
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3C0C2',
    },
});

export default function DatePickeriOS(props : Props){
    const [date, setDate] = useState(new Date());
    const {getFormDate} = props;
    const startDate = new Date();
    const maxDate = new Date();

    startDate.setHours(0, 0, 0);
    maxDate.setDate(startDate.getDate() + 90);
    maxDate.setHours(0, 0, 0);

    const onChange = (_, selectedDate: Date) => {
        setDate(selectedDate);
        getFormDate(selectedDate);
    };
    
    return (
        <View style={styles.container}>
        <DateTimePicker 
            key='mobile datetime picker'
            value={date}
            minimumDate={startDate}
            maximumDate={maxDate}
            onChange={onChange}
            mode='datetime'   
        />
        </View>);
        
}