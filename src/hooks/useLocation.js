import { useEffect, useState } from 'react'
import * as Permissions from 'expo-permissions';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default (shouldTrackUser, callback) => {

    const [err, setErr] = useState(null)

    useEffect(() => {

        let subscriber;
        // Helper function to start permissions and watch location
        const startWatching = async () => {

            try {
                // Ask user for location permissions
                const { granted } = await requestPermissionsAsync()
                if (granted) {
                    const subscriber = await watchPositionAsync({
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    },
                        callback)


                } else {
                    throw new Error('Location permission not granted.')
                }
            } catch (e) {
                setErr(e)
            }
        }


        if (shouldTrackUser) {
            startWatching()
        } else {
            if (subscriber) {
                subscriber.remove()
            }

            subscriber = null
        }

        // cleanup function
        return () => {
            if (subscriber)
                subscriber.remove()
        }


    }, [shouldTrackUser, callback])

    return [err]
}