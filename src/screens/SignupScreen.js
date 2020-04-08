import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'

import Spacer from '../components/styling/Spacer'
import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext)
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
            {state.errorMessage ? <Text style={styles.error}>{state.errorMessage}</Text> : null}


            <Spacer>
                <Button title="Sign Up" onPress={() => signup({ email, password })} />
            </Spacer>

            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Spacer>
                    <Text style={styles.link}>Already have an account? Sign in here.</Text>
                </Spacer>
            </TouchableOpacity>
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
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center'
    },
    link: {
        color: 'blue',
        textAlign: 'center'
    }
})

export default SignupScreen