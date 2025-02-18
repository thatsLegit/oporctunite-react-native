import React from 'react';
import BarChart1 from '../../../components/Chart/BarChart1';
import BilanCategorieScreen from './BilanCategorieScreen';

const BilanCategorie1Screen = props => {
    return (
        <BilanCategorieScreen
            chart={
                <BarChart1 
                    navigation = {props.navigation}
                />
            } 
            navigation = {props.navigation}
        />
    );
};

export default BilanCategorie1Screen;