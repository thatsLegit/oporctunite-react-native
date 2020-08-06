import React, { useCallback, useEffect, useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryContainer, VictoryChart, VictoryAxis, VictoryScatter } from "victory-native";
import { fetchMoyenneEvaluationBilan } from "../../helper/db/requetes"
import Spinner from 'react-native-loading-spinner-overlay';

const LineChart1 = props => {

    const [evaluation, setEvaluation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const majevaluation = useCallback(async () => {       
        const result = await fetchMoyenneEvaluationBilan("Etat corporel");
        
        if (!result.rows._array || !result.rows._array.length) {
            return;
        }
        var resultAvecDate=[];
        let jour="";
        let nbJour=0;
        result.rows._array.forEach(element => {
            if(jour!=formatDate(element.dateTest) && nbJour<6){
                resultAvecDate.push({"dateTest" : formatDate(element.dateTest),"noteEval" : element.noteEval});
        
                nbJour++;
            }
            jour=formatDate(element.dateTest);
            
        });
        setEvaluation(resultAvecDate);  
        setIsLoading(false);    
    }, []);

    useEffect(() => {

        majevaluation();

    }, []);
 

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month].join('-');
    }

    var data = [];

    switch (evaluation.length) {
        case 1:
            data = [
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval },
            ]
            break;
        case 2:
            data = [
                { x: evaluation[1].dateTest, y: evaluation[1].noteEval },
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval }
            ]
            break;
        case 3:
            data = [
                { x: evaluation[2].dateTest, y: evaluation[2].noteEval },
                { x: evaluation[1].dateTest, y: evaluation[1].noteEval },
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval },
            ]
            break;
        case 4:
            data = [
                { x: evaluation[3].dateTest, y: evaluation[3].noteEval },
                { x: evaluation[2].dateTest, y: evaluation[2].noteEval },
                { x: evaluation[1].dateTest, y: evaluation[1].noteEval },
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval },
            ]
            break;
        case 5:
            data = [
                { x: evaluation[4].dateTest, y: evaluation[4].noteEval },
                { x: evaluation[3].dateTest, y: evaluation[3].noteEval },
                { x: evaluation[2].dateTest, y: evaluation[2].noteEval },
                { x: evaluation[1].dateTest, y: evaluation[1].noteEval },
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval },
            ]
            break;
        case 6:
            data = [
                { x: evaluation[5].dateTest, y: evaluation[5].noteEval },
                { x: evaluation[4].dateTest, y: evaluation[4].noteEval },
                { x: evaluation[3].dateTest, y: evaluation[3].noteEval },
                { x: evaluation[2].dateTest, y: evaluation[2].noteEval },
                { x: evaluation[1].dateTest, y: evaluation[1].noteEval },
                { x: evaluation[0].dateTest, y: evaluation[0].noteEval },
            ]
            break;
        default:
            break;
    };


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
    return (
        <View style={styles.container}>
            <VictoryChart
                domainPadding={25}
                minDomain={{ y: 0 }}
                maxDomain={{ y: 10 }}
                containerComponent={<VictoryContainer disableContainerEvents />}
            >
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "grey",
                            opacity: 0.5
                        },
                        grid: {
                            stroke: "grey", opacity: 0.3
                        },
                        tickLabels: {
                            fill: "black",
                            fillOpacity: 0.7,
                        }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: {
                            stroke: "grey",
                            opacity: 0.5
                        },
                        tickLabels: {
                            fill: "black",
                            fillOpacity: 0.7,
                        }
                    }}
                />

                <VictoryScatter data={data}
                    size={5}
                    style={{ data: { fill: "#2E9BCA" } }}
                    labels={({ datum }) => datum.y}
                />
            </VictoryChart>
            <View style={styles.titreContainer}>
                <Text style={styles.titre}>Etat corporel</Text>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
    },
    titreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    titre: {
        width: 100,
        fontSize: 15,
    }
});


export default LineChart1;