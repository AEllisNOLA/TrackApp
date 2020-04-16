import '../_mockLocation'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'

const TrackCreateScreen = ({ isFocused }) => {
    const { addLocation } = useContext(LocationContext)
    const [err] = useLocation(isFocused, addLocation)


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

export default withNavigationFocus(TrackCreateScreen)