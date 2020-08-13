import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import PDFReader from 'rn-pdf-reader-js'
import { CustomBackHeaderButton } from '../../components/UI/HeaderButton';


const FicheScreen = props => {
    return (
        <PDFReader
            source={{
                uri: props.route.params.fiche.urlImage
            }}
        />
    );
};


export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.fiche.titreFiche,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomBackHeaderButton}>
                <Item
                    title='Retour'
                    iconName='back'
                    onPress={() => navData.navigation.goBack()}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomBackHeaderButton}>
                <Item
                    title='favoris'
                    iconName='heart-outlined'
                    onPress={() => { }}
                />
            </HeaderButtons>
        )
    };
};


export default FicheScreen;