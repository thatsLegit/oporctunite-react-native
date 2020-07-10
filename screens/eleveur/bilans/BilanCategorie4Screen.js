import React from 'react';
import BarChart4 from '../../../components/Chart/BarChart4';
import BilanCategorieScreen from './BilanCategorieScreen';


const BilanCategorie4Screen = props => {
    return (
        <BilanCategorieScreen
            chart={
                <BarChart4/>
            } 
            navigation = {props.navigation}
        />
    );
};

export default BilanCategorie4Screen;