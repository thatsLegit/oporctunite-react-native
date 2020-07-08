import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryChart, VictoryGroup, VictoryArea, VictoryAxis, VictoryLabel, VictoryBar, VictoryStack } from "victory-native";
import { useSelector } from 'react-redux';
import { lineBreaker } from '../../helper/LineBreaker';


const BarChart1 = props => {

    let titreGlobaleSousCateg = [];
    let moyenneGlobaleSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteGlobaleSousCateg)).map(([key, value]) => {
        if (Object.values(value) == "Bon état général") {
            titreGlobaleSousCateg.push(key);
            moyenneGlobaleSousCateg.push(Object.keys(value));
        }
    })

    let bilanEleveurSousCateg = [];
    let bilanEleveurTitreSousCateg = [];

    useSelector(state => Object.entries(state.bilan.noteSousCateg)).map(([key, value]) => {
        if (Object.values(value) == "Bon état général") {
            bilanEleveurTitreSousCateg.push(key);
            bilanEleveurSousCateg.push(Object.keys(value));
        }
    })

    // Tableau avec les notes arranger pour les catégories afin d'avoir un bonne ordre et toujours avoir une valeur
    let tableauNoteSousCategArranger = [];


    titreGlobaleSousCateg.forEach(globalTitre => {

        let i = 0;

        while (i < titreGlobaleSousCateg.length) {
            if (globalTitre == bilanEleveurTitreSousCateg[i]) {
                tableauNoteSousCategArranger.push(bilanEleveurSousCateg[i]);
            }
            else if (bilanEleveurTitreSousCateg.indexOf(globalTitre) == -1) {
                tableauNoteSousCategArranger.push(0);
                i = titreGlobaleSousCateg.length; //  Pour sortie de la boucle et pas ajouter quatre 0
            }
            i++;
        }

        i = 0;
    });


    return (
        <View style={styles.container}>
            <VictoryChart padding={{ top: 30, bottom: 90, left: 45, right: 30 }}>
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 12
                        }
                    }}
                    tickLabelComponent={
                        <VictoryLabel dy={20}
                        />
                    }
                />
                <VictoryAxis
                    dependentAxis

                    style={{ tickLabels: { fontSize: 12 } }}
                />
                <VictoryGroup offset={24}
                    colorScale={"qualitative"}
                >
                    <VictoryBar
                        style={{ data: { fill: "#2E9BCA" } }}
                        data={[{ x: lineBreaker(titreGlobaleSousCateg[0], 15), y: tableauNoteSousCategArranger[0] }, { x: lineBreaker(titreGlobaleSousCateg[1], 15), y: tableauNoteSousCategArranger[1] }]}
                    />
                    <VictoryBar
                        style={{ data: { fill: "#FF6666" } }}
                        data={[{ x: lineBreaker(titreGlobaleSousCateg[0], 15), y: moyenneGlobaleSousCateg[0] }, { x: lineBreaker(titreGlobaleSousCateg[1], 15), y: moyenneGlobaleSousCateg[1] }]}
                    />

                </VictoryGroup>
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

export default BarChart1