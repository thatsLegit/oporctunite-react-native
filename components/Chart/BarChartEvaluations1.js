import React, { useCallback, useEffect, useState} from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar } from "victory-native";
import { useSelector } from 'react-redux';
import Svg from "react-native-svg";
import { lineBreaker } from '../../helper/LineBreaker';
import { fetchMoyenneEvaluationParSousCategorieBilan } from "../../helper/db/requetes"
import Spinner from 'react-native-loading-spinner-overlay';

const BarChartEvaluations1 = props => {

    const [sousCategories, setSousCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const majSousCategories = useCallback(async () => {       
        const result = await fetchMoyenneEvaluationParSousCategorieBilan("Expression des autres comportements");

        if (!result.rows._array || !result.rows._array.length) {
            return;
        }
        setSousCategories(result.rows._array);  
        setIsLoading(false);    
    }, []);

    useEffect(() => {

        majSousCategories();

    }, []);

    var dataEleveur = [];
    var dataGlobale = [];

    switch (sousCategories.length) {
        case 1:
            dataEleveur = [
                { x: lineBreaker(sousCategories[0].nomEvaluation), y: sousCategories[0]. noteEval }
            ];
        
            dataGlobale = [
                { x: lineBreaker(sousCategories[0].nomEvaluation), y: sousCategories[0].moyenneGlobaleEval }
            ];
        break;
        case 2:
            dataEleveur = [
                { x: lineBreaker(sousCategories[0].nomEvaluation), y: sousCategories[0]. noteEval },
                { x: lineBreaker(sousCategories[1].nomEvaluation), y: sousCategories[1]. noteEval }
            ];
        
            dataGlobale = [
                { x: lineBreaker(sousCategories[0].nomEvaluation), y: sousCategories[0].moyenneGlobaleEval },
                { x: lineBreaker(sousCategories[1].nomEvaluation), y: sousCategories[1].moyenneGlobaleEval }
            ];
        break;
        default:
        break;
    };

    const windowWidth = useWindowDimensions().width;

    if (isLoading) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner
                    visible={isLoading}
                    textContent={'Chargement'}
                    textStyle={{ color: '#FFF' }}
                />
            </View>
        );
    }
    
    if (Platform.OS == 'android') {
        return (
            <View style={styles.container}>
                {
                    (sousCategories.length==1) // Une sous catégorie == 1 
                ? 
                    <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
                        <VictoryChart
                            padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                            containerComponent={<VictoryContainer disableContainerEvents />}
                        >
                            <VictoryAxis
                                style={{
                                    tickLabels: {
                                        fontSize: 12,
                                    }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{ tickLabels: { fontSize: 12 } }}
                            />
                            <VictoryGroup
                                offset={windowWidth/10.2}
                                colorScale={"qualitative"}
                            >
                                <VictoryBar
                                    style={{ data: { fill: "#2E9BCA" } }}
                                    data={dataEleveur}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: (event, data) => {
                                                (data.key == "chart-group-2-bar-0-data-0") ? props.navigation.navigate('BilanEvaluation2Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
                                            },
                                        }
                                    }]}
                                />
                                <VictoryBar
                                    style={{ data: { fill: "#FF6666" } }}
                                    data={dataGlobale}
                                />
                            </VictoryGroup>
                        </VictoryChart>
                    </Svg>
                :
                    <Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
                        <VictoryChart
                            padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                            containerComponent={<VictoryContainer disableContainerEvents />}
                        >
                            <VictoryAxis
                                style={{
                                    tickLabels: {
                                        fontSize: 12,
                                    }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{ tickLabels: { fontSize: 12 } }}
                            />
                            <VictoryGroup
                                offset={windowWidth/15}
                                colorScale={"qualitative"}
                            >
                                <VictoryBar
                                    style={{ data: { fill: "#2E9BCA" } }}
                                    data={dataEleveur}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: (event, data) => {
                                                (data.key == "chart-group-2-bar-0-data-1") ? props.navigation.navigate('BilanEvaluation2Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
                                            },
                                        }
                                    }]}
                                />
                                <VictoryBar
                                    style={{ data: { fill: "#FF6666" } }}
                                    data={dataGlobale}
                                />
                            </VictoryGroup>
                        </VictoryChart>
                    </Svg>
                }   
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                {
                    (sousCategories.length==1) // Une sous catégorie == 1 
                ? 
                        <VictoryChart
                            padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                            containerComponent={<VictoryContainer disableContainerEvents />}
                        >
                            <VictoryAxis
                                style={{
                                    tickLabels: {
                                        fontSize: 12,
                                    }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{ tickLabels: { fontSize: 12 } }}
                            />
                            <VictoryGroup
                                offset={windowWidth/10.2}
                                colorScale={"qualitative"}
                            >
                                <VictoryBar
                                    style={{ data: { fill: "#2E9BCA" } }}
                                    data={dataEleveur}
                                    events={[{
                                        target: "data",
                                        eventHandlers: {
                                            onPressOut: (event, data) => {
                                                (data.key == "chart-group-2-bar-0-data-0") ? props.navigation.navigate('BilanEvaluation2Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
                                            },
                                        }
                                    }]}
                                />
                                <VictoryBar
                                    style={{ data: { fill: "#FF6666" } }}
                                    data={dataGlobale}
                                />
                            </VictoryGroup>
                    </VictoryChart>
                :
                    <VictoryChart
                        padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                        containerComponent={<VictoryContainer disableContainerEvents />}
                    >
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    fontSize: 12,
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ tickLabels: { fontSize: 12 } }}
                        />
                        <VictoryGroup
                            offset={windowWidth/15}
                            colorScale={"qualitative"}
                        >
                            <VictoryBar
                                style={{ data: { fill: "#2E9BCA" } }}
                                data={dataEleveur}
                                events={[{
                                    target: "data",
                                    eventHandlers: {
                                        onPressOut: (event, data) => {
                                            (data.key == "chart-group-2-bar-0-data-0") ? props.navigation.navigate('BilanEvaluation2Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
                                        },
                                    }
                                }]}
                            />
                            <VictoryBar
                                style={{ data: { fill: "#FF6666" } }}
                                data={dataGlobale}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                }  
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
    }
});


export default BarChartEvaluations1;