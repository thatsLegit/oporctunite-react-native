//Stacks default options
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';


export default defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};