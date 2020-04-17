import '../_mockLocation'
import React, { useContext, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import TrackForm from '../components/TrackForm'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'

const TrackCreateScreen = ({ isFocused }) => {
    const { state: isRecording, addLocation } = useContext(LocationContext)

    const callback = useCallback((location) => {
        addLocation(location, isRecording)
    }, [isRecording])

    const [err] = useLocation(isFocused || isRecording, callback)


    return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text h2 style={styles.title}>Create a Track</Text>
            <Map />

            {err ? <Text>Please enable location services.</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    }
})

export default withNavigationFocus(TrackCreateScreen)