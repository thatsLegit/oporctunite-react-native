import React from 'react';
import BarChart2 from '../../../components/Chart/BarChart2';
import BilanCategorieScreen from './BilanCategorieScreen';

const BilanCategorie2Screen = props => {
    return (
        <BilanCategorieScreen
            chart={
                <BarChart2/>
            } 
            navigation = {props.navigation}
        />
    );
};

export default BilanCategorie2Screen;