import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';


const InputBorder = props => {
    return (
        <View {...props} style={{ ...props.style, ...styles.inputBorder }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    inputBorder: {
        width: "15%",
        borderColor: Colors.primary,
        borderWidth: 3,
        borderRadius: 10,
        padding: 5
    }
});


export default InputBorder;