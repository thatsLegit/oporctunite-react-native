import React from 'react';
import { View, StyleSheet} from 'react-native';
import { VictoryTheme, VictoryChart, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { useSelector } from 'react-redux';

const RadarChart = props => {

    let titreGlobaleCateg = [];
    let moyenneGlobaleCateg = [];
    useSelector(state => Object.entries(state.bilan.noteGlobaleCateg)).map(([key, value]) => {
        titreGlobaleCateg.push(key);
        moyenneGlobaleCateg.push(value);
    })

    let bilanEleveurCateg = [];
    let bilanEleveurTitreCateg = [];
    useSelector(state => Object.entries(state.bilan.noteCateg)).map(([key, value]) => {
        bilanEleveurTitreCateg.push(key);
        bilanEleveurCateg.push(value);  
    })
 
    // Tableau avec les notes arranger pour les catégories afin d'avoir un bonne ordre et toujours avoir une valeur
    let tableauNoteCategArranger = [];
    let i = 0;
    titreGlobaleCateg.forEach(element => {
        if(element===bilanEleveurTitreCateg[i]){
            tableauNoteCategArranger.push(bilanEleveurCateg[i]);
        }else{
            tableauNoteCategArranger.push(0);
        }
        i++;
    });

    const UserData = [
        // Ligne 1 = élevage en cours
        { [titreGlobaleCateg[0]]:tableauNoteCategArranger[0], [titreGlobaleCateg[1]]: tableauNoteCategArranger[1], [titreGlobaleCateg[2]]: tableauNoteCategArranger[2], [titreGlobaleCateg[3]]: tableauNoteCategArranger[3]},
        { [titreGlobaleCateg[0]]: moyenneGlobaleCateg[0], [titreGlobaleCateg[1]]: moyenneGlobaleCateg[1], [titreGlobaleCateg[2]]: moyenneGlobaleCateg[2], [titreGlobaleCateg[3]]: moyenneGlobaleCateg[3]}
    ];

    const getMaxima = (data) => {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = 13;
            return memo;
        }, {});
    }

    const processData = (data) => {
        const maxByGroup = getMaxima(data);

        const makeDataArray = (d) => {
            return Object.keys(d).map((key) => {
                return { x: key, y: d[key] / maxByGroup[key] };
            });
        };

        return data.map((datum) => makeDataArray(datum));
    }

    const data = processData(UserData);
    const maxima = getMaxima(UserData);

    return (
        <View style={styles.container}>
            <VictoryChart
                polar
                //theme={VictoryTheme.material}
                domain={{ y: [0, 1] }}   
                height={400}
                width={400} 

                
            >
                <VictoryGroup
                    colorScale={["#0074D9", "#FF4136"]}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                >
                    {data.map((data, i) => {
                        return <VictoryArea key={i} data={data} />;
                    })}
                </VictoryGroup>
                {
                    Object.keys(maxima).map((key, i) => {
                        return (
                            <VictoryPolarAxis
                            height={350}
                            width={350}
                                key={i}
                                dependentAxis
                                style={{
                                    axisLabel: { padding: 10 },
                                    axis: { stroke: "none" },
                                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.7 }
                                }}
                                tickLabelComponent={
                                    <VictoryLabel labelPlacement="vertical" />
                                }
                                labelPlacement="perpendicular"
                                axisValue={i + 1} label={key}
                                tickFormat={(t) => Math.ceil(t * maxima[key])}
                                tickValues={[0.25, 0.5, 0.75]}
                            />
                        );
                    })
                }
                <VictoryPolarAxis
                    //Axe y
                    labelPlacement="parallel"
                    tickFormat={() => ""}
                    style={{
                        axis: { stroke: "none" },
                        grid: { stroke: "grey", opacity: 0.5 }
                    }}
                    
                />
            </VictoryChart>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'center',
    }
  });

export default RadarChart