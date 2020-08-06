import React from 'react';
import BarChartEvaluations1 from '../../../components/Chart/BarChartEvaluations1';
import BilanCategorieScreen from './BilanCategorieScreen';

const BilanEvaluations1Screen = props => {
    return (
        <BilanCategorieScreen
            chart={
                <BarChartEvaluations1
                    navigation = {props.navigation}
                />
            } 
            retourCategorie={true}
            navigation = {props.navigation}
        />
    );
};

export default BilanEvaluations1Screen;