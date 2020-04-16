import '../_mockLocation'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { Text } from 'react-native-elements'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'
import * as Permissions from 'expo-permissions';
import Map from '../components/Map'

const TrackCreateScreen = () => {
    const [err, setErr] = useState(null)

    // Helper function to start permissions and watch location
    const startWatching = async () => {

        try {
            // Ask user for location permissions
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                console.log('Granted')
            } 

            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) => {
                console.log(location)
            })
        } catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        startWatching()
    }, [])

    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2 style={styles.title}>Create a Track</Text>
            <Map />

            {err ? <Text>Please enable location services.</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    }
})

export default TrackCreateScreen