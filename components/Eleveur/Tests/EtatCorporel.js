import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Counter from '../../UI/Counter';
import ProgressBar from 'react-native-progress/Bar';
import { FontAwesome } from '@expo/vector-icons';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';


const EtatCorporel = props => {

    const { modalInfo } = props;
    const [modalInfoVisible, setModalInfoVisible] = useState(modalInfo);
    const [modalVisible, setModalVisible] = useState(false);
    [count, setCount] = useState(0);
    [count2, setCount2] = useState(0);
    [count3, setCount3] = useState(0);
    [globalCount, setGlobalCount] = useState(0);

    const changeHandler = (count, sign) => {
        setCount(count);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    }
    const changeHandler2 = (count2, sign) => {
        setCount(count2);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    }
    const changeHandler3 = (count3, sign) => {
        setCount(count3);
        if (sign == 'plus') {
            setGlobalCount(globalCount + 1);
        } else {
            setGlobalCount(globalCount - 1);
        }
    }

    const modalCloser = () => {
        setModalVisible(false);
    }

    const modalInfoCloser = () => {
        setModalInfoVisible(false);
    }

    useEffect(() => {
        setModalInfoVisible(modalInfo);
    }, [modalInfo]);

    return (
        <View>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>{globalCount} / 40</Text>
                <ProgressBar progress={globalCount / 40} width={200} />
            </View>
            <View style={{ height: Dimensions.get('window').height / 1.60 }}>
                <ScrollView>
                    <View>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                            Nombre de truies maigres {" "}
                                <TouchableWithoutFeedback onPress={() => {
                                    setModalVisible(true);
                                }}>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                            Nombre de truies normales {" "}
                                <TouchableWithoutFeedback>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler2} />
                        </View>
                    </View>

                    <View style={{ marginVertical: 25 }}>
                        <View>
                            <Text style={styles.text}>
                                <Text style={{ fontSize: 25 }}>• {" "}</Text>
                            Nombre de truies grasses {" "}
                                <TouchableWithoutFeedback>
                                    <FontAwesome name="question-circle" size={24} color="black" />
                                </TouchableWithoutFeedback>
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <Image style={styles.photo1} source={{ uri: props.photo1 }} />
                            <Counter onChange={changeHandler3} />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/*Modal popup*/}
            <ModalPopupInfo
                visible={modalVisible}
                onClose={modalCloser}
                text='Une pression ferme avec la paume de la main permet de ressentir les reliefs osseux de la hanche et du dos.'
            />

            {/*Modal info popup*/}
            <ModalPopupInfo
                visible={modalInfoVisible}
                onClose={modalInfoCloser}
                text='Regarder les saillies osseuses, la colonne vertebrale, les hanches et les arêtes osseuses doivent être inspectées et palpées.'
            />

        </View>
    );
};


const styles = StyleSheet.create({
    counterContainer: {
        alignItems: 'center',
        marginBottom: 35,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    counterText: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    },
    photo1: {
        minWidth: 125,
        maxWidth: 200,
        maxHeight: 250,
        minHeight: 150
    },
    text: {
        fontFamily: 'open-sans',
        fontSize: 17,
        marginLeft: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


export default EtatCorporel;