import React, { useEffect, useState, useCallback } from 'react';
import { View, Modal, TouchableHighlight, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';


const ModalPopupInfo = props => {
    const { visible, confirmation } = props;
    const [modalHeight, setModalHeight] = useState(0);
    const [modalVisible, setModalVisible] = useState(visible);

    useEffect(() => {
        setModalVisible(visible);
    }, [visible]);

    const modalHeightHandler = useCallback((height) => {
        setModalHeight(height + 70);
    }, [modalHeight]);


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={{ ...styles.modalView, height: modalHeight, maxHeight: Dimensions.get('window').height / 2 }}>
                        <ScrollView>
                            <View onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                modalHeightHandler(height);
                            }}>
                                <Text style={{ ...styles.modalText, textAlign: props.align ? "auto" : "center" }}>
                                    {props.text}
                                </Text>
                                <View style={{ flexDirection: confirmation ? 'row' : 'column', justifyContent: 'center' }}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton }}
                                        onPress={props.onClose}
                                    >
                                        <Text style={styles.textStyle}>{props.buttonText}</Text>
                                    </TouchableHighlight>
                                    {confirmation && <TouchableHighlight
                                        style={{ ...styles.openButton, marginLeft: 20, backgroundColor: Colors.primary }}
                                        onPress={props.onValidation}
                                    >
                                        <Text style={styles.textStyle}>Confirmer</Text>
                                    </TouchableHighlight>}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontFamily: 'open-sans-bold',
        fontSize: 15
    },
    modalText: {
        marginBottom: 15,
        fontSize: 16
    }
});


export default ModalPopupInfo;