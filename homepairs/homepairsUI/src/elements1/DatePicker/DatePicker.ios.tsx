import React , {useState} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View, StyleSheet, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton} from 'react-native-paper';
import {calendar} from 'homepairs-images';
import * as BaseStyles from 'homepairs-base-styles';

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
    dateText: {
        flex: 1,
        fontFamily: BaseStyles.FontTheme.primary,
        fontSize: BaseStyles.FontTheme.reg,
        alignSelf: 'center',
    },
    dateContainer: {
        borderRadius: BaseStyles.BorderRadius.medium,
        borderWidth: 1, 
        padding: BaseStyles.MarginPadding.medium,
        borderColor: BaseStyles.LightColorTheme.lightGray,
        flexDirection: 'row',
    },
});

export default function DatePickeriOS(props : Props){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('datetime');
    const [show, setShow] = useState(false);
    const {getFormDate} = props;

    const onChange = (_, selectedDate: Date) => {
        setDate(selectedDate);
        setShow(Platform.OS === 'ios');
        getFormDate(selectedDate);
    };

    const showMode = currentMode => {
        setShow(!show);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('datetime');
    };
    
    return (
        <View>
          <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{date.toDateString()}, {date.toLocaleTimeString()}</Text>
              <IconButton onPress={showDatepicker} icon={calendar} />
          </View>
          {show && (
            <DateTimePicker
              testID="ios datetime picker"
              value={date}
              mode={mode}
              is24Hour={false}
              onChange={onChange}
              minuteInterval={15}
            />
          )}
        </View>
      );
        
}
