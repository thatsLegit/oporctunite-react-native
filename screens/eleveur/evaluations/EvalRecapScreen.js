import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {CustomHeaderButton} from '../../../components/UI/HeaderButton';
import ModalPopupInfo from '../../../components/Eleveur/Evaluations/ModalPopupInfo';


const EvalRecapScreen = props => {

    const sentToApi = useSelector(state => state.test.lastSentEvalsDidReachApi);
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState({});

    useEffect(() => {
        if (sentToApi !== null) {
            setMessage(
                sentToApi
                ? {text: (<Text>
                            <AntDesign name="checkcircleo" size={23} color="green" />{" "}
                            Vos évaluations ont été envoyées avec succès !
                        </Text>), 
                    type: 'success'
                }
                : {text: (<Text>
                            <FontAwesome5 name="exclamation" size={25} color="red" />{" "}
                            Une ou plusieurs de vos évaluations n'ont pas pû être envoyées à nos serveurs.{"\n"} Ne vous en faites pas ! Vos données sont enregistrées sur votre appareil et seront réenvoyées à votre prochaine connexion sur l'application{" "}
                            <FontAwesome name="smile-o" size={25} color="green" />.
                        </Text>), 
                    type: 'danger'
                }
            );
            setModal(true);
        }
    }, [sentToApi]);

    const modalCloser = () => setModal(false);


    return (
        <View>
            <Text>
                Récapitulatif des évaluations effectuées.
            </Text>
            <Button title='Réaliser des évaluations' onPress={() => { props.navigation.navigate('CategSelection') }} />
            <ModalPopupInfo
                visible={modal}
                onClose={modalCloser}
                text={message.text}
                buttonText='Fermer'
                type={message.type}
                align={message.type == 'success' ? true : false}
            />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Evaluations',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
});


export default EvalRecapScreen;