import React, { useCallback, useEffect, useState} from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { VictoryContainer, VictoryChart, VictoryGroup, VictoryAxis, VictoryBar } from "victory-native";
import Svg from "react-native-svg";
import { lineBreaker } from '../../helper/LineBreaker';
import { fetchMoyenneSousCategorieBilan } from "../../helper/db/requetes"
import Spinner from 'react-native-loading-spinner-overlay';


const BarChart3 = props => {

    const [sousCategories, setSousCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const majSousCategories = useCallback(async () => {       
        const result = await fetchMoyenneSousCategorieBilan("Expression des comportements");
        
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
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneSousCateg }
            ];
        
            dataGlobale = [
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneGlobaleSousCateg }
            ];
        break;
        case 2:
            dataEleveur = [
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneSousCateg },
                { x: lineBreaker(sousCategories[1].nomSousCateg), y: sousCategories[1].moyenneSousCateg }
            ];
        
            dataGlobale = [
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneGlobaleSousCateg },
                { x: lineBreaker(sousCategories[1].nomSousCateg), y: sousCategories[1].moyenneGlobaleSousCateg }
            ];
        break;
        case 3:
            dataEleveur = [
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneSousCateg },
                { x: lineBreaker(sousCategories[1].nomSousCateg), y: sousCategories[1].moyenneSousCateg },
                { x: lineBreaker(sousCategories[2].nomSousCateg), y: sousCategories[2].moyenneSousCateg }
            ];
        
            dataGlobale = [
                { x: lineBreaker(sousCategories[0].nomSousCateg), y: sousCategories[0].moyenneGlobaleSousCateg },
                { x: lineBreaker(sousCategories[1].nomSousCateg), y: sousCategories[1].moyenneGlobaleSousCateg },
                { x: lineBreaker(sousCategories[2].nomSousCateg), y: sousCategories[2].moyenneGlobaleSousCateg }
            ];
        break;
        default:
        break;
    };
    
    const windowWidth = useWindowDimensions().width;

    const returnGraphAndroid = () =>{
        if(sousCategories.length == 3) {
            return (
                <Svg width={400} height={400} viewBox="0 0 400 400"
                    style={{ width: "100%", height: "auto" }}>
                    <VictoryChart
                        padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                    >
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    fontSize: 12
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ tickLabels: { fontSize: 12 } }}
                        />
                        <VictoryGroup
                            offset={windowWidth/20}
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
            )
        }else if (sousCategories.length == 2) {
            return(
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
            )
        }
        else {
            return(
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
            )
        }
    }

    const returnGraphIos = () =>{
        if(sousCategories.length == 3) {
            return (
                    <VictoryChart
                        padding={{ top: 70, bottom: 70, left: 55, right: 22 }}
                    >
                        <VictoryAxis
                            style={{
                                tickLabels: {
                                    fontSize: 12
                                }
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            style={{ tickLabels: { fontSize: 12 } }}
                        />
                        <VictoryGroup
                            offset={windowWidth/20}
                            colorScale={"qualitative"}
                        >
                            <VictoryBar
                                style={{ data: { fill: "#2E9BCA" } }}
                                data={dataEleveur}
                            />
                            <VictoryBar
                                style={{ data: { fill: "#FF6666" } }}
                                data={dataGlobale}
                            />
                        </VictoryGroup>
                    </VictoryChart>
            )
        }else if (sousCategories.length == 2) {
            return(
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
                                            (data.key == "chart-group-2-bar-0-data-0") ? props.navigation.navigate('BilanEvaluation1Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
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
            )
        }
        else {
            return(
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
                                            (data.key == "chart-group-2-bar-0-data-0") ? props.navigation.navigate('BilanEvaluation1Screen') : alert("Pas de graphique disponible pour les évaluations de cette sous-catégorie.");
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
                
            )
        }
    }
    
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
                {returnGraphAndroid()}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                {returnGraphIos()}
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


export default BarChart3;