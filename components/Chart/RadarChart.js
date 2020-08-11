import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Button } from 'react-native';
import { VictoryChart, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { lineBreaker } from '../../helper/LineBreaker';
import { fetchMoyenneCategorieBilan } from "../../helper/db/requetes"
import Spinner from 'react-native-loading-spinner-overlay';

const RadarChart = props => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNull, setIsNull] = useState(false);
    const { isRefreshing } = props;

    const majCategories = useCallback(async () => {

        const result = await fetchMoyenneCategorieBilan();
        if (result.rows._array.length != 4) {
            setIsNull(true);
            setIsLoading(false);
        } else {
            setIsNull(false);
            setCategories(result.rows._array);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        majCategories();
    }, [isRefreshing]);


    var UserData = [];

    switch (categories.length) {
        case 1:
            UserData = [
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneCateg },
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneGlobaleCateg }
            ]
            break;
        case 2:
            UserData = [
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneCateg, [categories[1].nomCateg]: categories[1].moyenneCateg },
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneGlobaleCateg, [categories[1].nomCateg]: categories[1].moyenneGlobaleCateg }
            ]
            break;
        case 3:
            UserData = [
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneCateg, [categories[1].nomCateg]: categories[1].moyenneCateg, [categories[2].nomCateg]: categories[2].moyenneCateg },
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneGlobaleCateg, [categories[1].nomCateg]: categories[1].moyenneGlobaleCateg, [categories[2].nomCateg]: categories[2].moyenneGlobaleCateg }
            ]
            break;
        case 4:
            UserData = [
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneCateg, [categories[1].nomCateg]: categories[1].moyenneCateg, [categories[3].nomCateg]: categories[3].moyenneCateg, [categories[2].nomCateg]: categories[2].moyenneCateg },
                { [lineBreaker(categories[0].nomCateg)]: categories[0].moyenneGlobaleCateg, [categories[1].nomCateg]: categories[1].moyenneGlobaleCateg, [categories[3].nomCateg]: categories[3].moyenneGlobaleCateg, [categories[2].nomCateg]: categories[2].moyenneGlobaleCateg }
            ]
            break;
        default:
            break;
    };

    const getMaxima = (data) => {
        const groupedData = Object.keys(data[0]).reduce((memo, key) => {
            memo[key] = data.map((d) => d[key]);
            return memo;
        }, {});
        return Object.keys(groupedData).reduce((memo, key) => {
            memo[key] = 10;
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

    var data = [];
    var maxima = [];
    if (categories.length > 0) {
        data = processData(UserData);
        maxima = getMaxima(UserData);
    }

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

    if (isNull) {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.commentaire}>
                        Réalisez au moins une évaluation dans chaque catégorie pour avoir accès à des graphiques personnalisées !
                </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <VictoryChart
                polar
                //theme={VictoryTheme.material}
                domain={{ y: [0, 1] }}
                height={windowWidth}
                width={windowWidth}
            >
                <VictoryGroup
                    colorScale={["#2E9BCA", "#FF6666"]}
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
                                height={325}
                                width={325}
                                key={i}
                                dependentAxis
                                style={{
                                    axisLabel: { padding: 25 },
                                    axis: { stroke: "none" },
                                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.7 }
                                }}
                                tickLabelComponent={
                                    <VictoryLabel />
                                }
                                labelPlacement="vertical"
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
                        axis: { stroke: "grey", opacity: 0.5 },
                        grid: { stroke: "grey", opacity: 0.5 }
                    }}

                />
            </VictoryChart>

            <Button title='Plus de détails' onPress={() => { props.navigation() }} />
        </View>

    );
}

const styles = StyleSheet.create({
    commentaire: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'open-sans'
    },
    container: {
        flex: 10,
        justifyContent: 'center',
    }
});

export default RadarChart;