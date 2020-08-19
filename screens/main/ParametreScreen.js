import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth';
import Colors from '../../constants/Colors';
import ModalPopupInfo from '../../components/Eleveur/Evaluations/ModalPopupInfo';


const ParametreScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [annulationModal, setAnnulationModal] = useState(false);

    const [nom, setNom] = useState('');
    const [code, setCode] = useState('');
    const [adresse, setAdresse] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [taille, setTaille] = useState('');
    const dispatch = useDispatch();

    const modalAnnulationTrigger = () => setAnnulationModal(true);
    const modalAnnulationCloser = () => setAnnulationModal(false);

    const persoDataHandler = useCallback(async () => {
        await dispatch(authActions.setUtilisateur());
        setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
        persoDataHandler();
    }, [dispatch, persoDataHandler]);

    const annulationHandler = async () => {
        setNom('');
        setCode('');
        setAdresse('');
        setVille('');
        setEmail('');
        setTel('');
        setTaille('');
        setAnnulationModal(false);
        props.navigation.navigate('Profil');
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primary}
                />
            </View>
        );
    }
    
    return (
        <View style={{flex: 1}}>
            
            <View style={{...styles.container, flex: 1, height: '92%' }} >  

                <Image style={styles.photo} source={require('../../assets/img/evaluations/Bursite-photo1.png')} />
                {/* Pour un éleveur */}
                <View style={styles.textContainer}>
                    <TextInput
                        style={styles.text}
                        placeholder="Nom d'élevage"
                        placeholderTextColor="#000"
                        onChangeText={text => setNom(text)}
                        defaultValue={nom}
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Code postal"
                        placeholderTextColor="#000"
                        onChangeText={text => setCode(text)}
                        defaultValue={code}
                        keyboardType="number-pad"
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Adresse"
                        multiline={true}
                        placeholderTextColor="#000"
                        onChangeText={text => setAdresse(text)}
                        defaultValue={adresse}
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Ville"
                        placeholderTextColor="#000"
                        onChangeText={text => setVille(text)}
                        defaultValue={ville}
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Email"
                        placeholderTextColor="#000"
                        onChangeText={text => setEmail(text)}
                        defaultValue={email}
                        keyboardType="email-address"
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Numéro de téléphone"
                        placeholderTextColor="#000"
                        onChangeText={text => setTel(text)}
                        defaultValue={tel}
                        keyboardType="phone-pad"
                        textAlign={'center'}
                    />
                    <TextInput
                        style={styles.text}
                        placeholder="Taille de l'élevage"
                        placeholderTextColor="#000"
                        onChangeText={text => setTaille(text)}
                        defaultValue={taille}
                        textAlign={'center'}
                    />
                </View>
            </View>

            <View style={{ ...styles.footer, height: '8%' }}>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { modalAnnulationTrigger() }}
                >
                    <Text style={styles.footerText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerBtn}
                    onPress={() => { props.navigation.navigate('Profil') }}
                >
                    <Text style={styles.footerText}>Sauvegarder</Text>
                </TouchableOpacity>
            </View>
           
            <ModalPopupInfo
                visible={annulationModal}
                onClose={modalAnnulationCloser}
                text="Êtes-vous sûrs de vouloir annuler les modifications en cours ?"
                buttonText='Annuler'
                confirmation
                onValidation={()=>annulationHandler()}
            />
        </View>
    );
};


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Paramètres',
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
    container:{
        alignItems: 'center',
        flex:1,
    },
    photo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 3,
        backgroundColor:"blue",
        marginVertical:15
    },
    textContainer:{     
        alignItems:"center"
    },
    text:{ 
        alignItems:"center",
        color: Colors.secondary,
        fontSize:16,  
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: Dimensions.get('window').width / 2,
    },
    footer: {
        flexDirection: "row",
        position: 'absolute',
        bottom: 0
    },
    footerBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.accent,
        color: "#FFF",
        height: "100%",
        width: "50%",
        borderColor: 'white',
        borderWidth: 1
    },
    footerText: {
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: "#FFF"
    }

});


export default ParametreScreen;