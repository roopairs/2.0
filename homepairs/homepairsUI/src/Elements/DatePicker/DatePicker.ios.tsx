import React , {useState} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View, StyleSheet, Platform, Button} from 'react-native';
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
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const {getFormDate} = props;

    const onChange = (_, selectedDate: Date) => {
        setDate(selectedDate);
        setShow(Platform.OS === 'ios');
        getFormDate(selectedDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };
    
    return (
        <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      );
        
}
