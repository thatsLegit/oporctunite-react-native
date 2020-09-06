import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { CustomHeaderButton } from '../../../components/UI/HeaderButton';
import ModalPopupInfo from '../../../components/UI/ModalPopupInfo';
import { fetchAllTests } from '../../../helper/db/requetes';


//Premier ecran dans la navigation des évaluations, cet écran reste à finir
//Le but pour l'instant ici est d'afficher une popup informant de l'envoi ou
//de la sauvegarde des évaluations tout juste effectuées.
const EvalRecapScreen = props => {

    const idutilisateur = useSelector(state => state.auth.idutilisateur);
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false); //sert uniquement à rafraichir l'ecran lorsque necessaire
    const [message, setMessage] = useState({});

    //Ces deux props sont transmises par l'écran précédent RecapScreen :
    //prevLength indique le nombre d'évaluations sauvegardées avant la soumission des tests
    //trigger est un booléen qui indique si on doit afficher une fenetre popup ou non.
    //En effet, il ne doit s'afficher que si de nouvelles évals ont été sauvegardées
    //suite à la réalisation d'une série de tests
    const prevLength = props.route.params ? props.route.params.length : null;
    const trigger = props.route.params ? props.route.params.trigger : false;

    const modalCloser = () => {
        setModal(false);
        props.navigation.setParams({
            trigger: false
        });
    };

    //Fonction qui détermine le contenu de la fenêtre popup
    const numberHandler = useCallback(async () => {
        const tests = await fetchAllTests(idutilisateur);
        const number = tests.rows._array.length;
        if(number > prevLength){
            setMessage({
                text: (
                    <Text>
                        <FontAwesome5 name="exclamation" size={25} color="red" />{" "}
                        Des évaluations n'ont pas pû être envoyées à nos serveurs.{"\n"} Ne vous en faites pas ! Vos données sont enregistrées sur votre appareil et seront réenvoyées à votre prochaine connexion sur l'application{" "}
                        <FontAwesome name="smile-o" size={25} color="green" />.
                    </Text>
                    ), 
                type: 'danger'
            });
        } else {
            setMessage({
                text: (
                    <Text>
                        <AntDesign name="checkcircleo" size={23} color="green" />{" "}
                        Vos évaluations ont été envoyées avec succès !
                    </Text>), 
                    type: 'success'
                });
        }
        setModal(true);
    }, []);


    //Permet de rafraichir cet écran à chaque fois qu'on navigue dessus
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            setUpdate(!update);
        });
        return unsubscribe;
    }, [props.navigation]);

    //Determine si on affiche le modal ou pas
    useEffect(() => {
        if(prevLength != null && trigger){
            numberHandler();
        }
    }, [prevLength, trigger]);


    return (
        <View>
            <View style={styles.buttonContainer}>
                <Button title='Réaliser des évaluations' onPress={() => { props.navigation.navigate('CategSelection') }} />
            </View>
            <View style={styles.progContainer}>
                <Text style={styles.progTitle}>
                    Progression des évaluations réalisées
                </Text>
                {/* Ici on aurait la progression des évaluations par catégorie, 
                par ex si 6 evals dans une catég et seulement 2 de réalisées, ça fait 33%. 
                Faire ça pour chaque catég et afficher des barres de prog pour chacunes */}
                <Text>En développement</Text>
            </View>
            <View style={styles.lastEvalContainer}>
                <Text style={styles.lastEvalTitle}>
                    Vos dernières évaluations
                </Text>
                <Text>En développement</Text>
                {/* Tableau récap des derniers evals soumises, avec le statut sauvegardé ou envoyé, 
                la note, la date, intituté de l'éval... dans la limite de 15 evaluations */}
            </View>
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