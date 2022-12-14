// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Button } from 'react-native';

const Pokemones = ({navigation}) => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        const options = {
            method: 'GET',
        };
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0', options);
            const json = await response.json();
            setInfo(json.results)
            // console.log(json);
        } catch (error) {
            console.log("error", error);
        }
    };


    let i = 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    info.map(({ name, url}) => {

                        return (
                            <View key={i} style={styles.item}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.title}>Nombre</Text>
                                    <Text key={i++} style={styles.name}>{name.toUpperCase()}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Button style={styles.button}
                                        title="Detalle"
                                        onPress={() => navigation.navigate('Detalle', {url_pok: url})}
                                        color="#4169E1"
                                    />
                                </View>
                            </View>
                        )
                        
                    })
                }

            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#ececec',
        padding: 24,
        marginVertical: 8,
        flexDirection: 'row',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#777777'
    },
    name: {
        fontSize: 17,
        color: '#1c1c1c',
    },
    button:  {
        fontWeight: 'bold'
    }
});

export default Pokemones;