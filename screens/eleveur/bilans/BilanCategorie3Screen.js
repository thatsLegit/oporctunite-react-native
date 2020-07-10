import React from 'react';
import BarChart3 from '../../../components/Chart/BarChart3';
import BilanCategorieScreen from './BilanCategorieScreen';

const BilanCategorie3Screen = props => {
    return (
        <BilanCategorieScreen
            chart={
                <BarChart3
                    navigation = {props.navigation}
                />
            } 
            navigation = {props.navigation}
        />
    );
};

export default BilanCategorie3Screen;