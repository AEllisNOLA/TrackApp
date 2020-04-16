import { useEffect, useState } from 'react'
import * as Permissions from 'expo-permissions';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (shouldTrackUser, callback) => {

    const [err, setErr] = useState(null)
    const [subscriber, setSubscriber] = useState(null)

    // Helper function to start permissions and watch location
    const startWatching = async () => {

        try {
            // Ask user for location permissions
            const { granted } = await requestPermissionsAsync()
            if (granted) {
                console.log('Granted')
                const sub = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback)

                setSubscriber(sub)
            } else {
                throw new Error('Location permission not granted.')
            }
        } catch (e) {
            setErr(e)
        }
    }

    useEffect(() => {
        if (shouldTrackUser) {
            startWatching()
        } else {
            subscriber.remove()
            setSubscriber(null)
        }
    }, [shouldTrackUser])

    return [err]
}