import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import Spacer from '../styling/Spacer'

const NavLink = ({navigation, routeName, message}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>{message}</Text>
            </Spacer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        textAlign: 'center'
    }
})

export default withNavigation(NavLink)