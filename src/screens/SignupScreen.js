import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'

import Spacer from '../components/styling/Spacer'

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h4 style={styles.title}>Sign Up for TrackApp</Text>
            </Spacer>
            <Input
                label='E-mail'
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer />
            <Input
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
            />
            <Spacer>
                <Button title="Sign Up" />
            </Spacer>
        </View>
    )
}

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        // take up as much vertical space as possible
        flex: 1,
        // center it vertically
        justifyContent: 'center',
        marginBottom: 75
    },
    title: {
        textAlign: "center"
    }
})

export default SignupScreen