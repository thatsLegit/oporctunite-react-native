import React from 'react';
import { View, StyleSheet } from 'react-native';

const Shadow = props => {
    return (
        <View {...props} style={{ ...props.style, ...styles.shadow }}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 8,
        elevation: 7
    }
});


export default Shadow;