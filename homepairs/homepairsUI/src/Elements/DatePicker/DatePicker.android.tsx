import React , {useState} from 'react'; //* *For every file that uses jsx, YOU MUST IMPORT REACT  */
import {View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {clock, calendar} from 'homepairs-images';
import {IconButton} from 'react-native-paper';
import * as BaseStyles from 'homepairs-base-styles';
import ThinButton from '../Buttons/ThinButton';
import Sticker from '../Stickers/Sticker';


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


export default function DatePickerAndroid(props : Props){    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('datetime');
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState('default');
    const {getFormDate} = props;

    const toggleShow = () => {
        setShow(!show);
    };

    const onChange = (_, selectedDate: Date) => {
        setShow(false);
        setDate(selectedDate);
        getFormDate(selectedDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setDisplay('calendar');
    };
    
    const showTimepicker = () => {
        showMode('time');
        setDisplay('clock');
    };

    
    return (
        /* * <ThinButton name="Date Picker for Andriod in Development" onClick={() => {getFormDate(new Date());}} /> * */
        <View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{date.toDateString()}, {date.toLocaleTimeString()}</Text>
              <IconButton onPress={showDatepicker} icon={calendar} />
              <IconButton onPress={showTimepicker} icon={clock} />
            </View>
            {show && (<DateTimePicker 
                testID='android datetime picker'
                value={date}
                onChange={onChange}
                mode={mode}
                is24Hour={false}
                display={display}
                minuteInterval={15}

                
            />)}
        </View>
        );
        
};