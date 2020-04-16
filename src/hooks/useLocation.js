import { useEffect, useState } from 'react'
import * as Permissions from 'expo-permissions';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (callback) => {

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
            }, callback)
        } catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        startWatching()
    }, [])

    return [err]
}