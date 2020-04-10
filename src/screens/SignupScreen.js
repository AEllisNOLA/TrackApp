import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import NavLink from '../components/reusable/NavLink'
import AuthForm from '../components/reusable/AuthForm'
import { Context as AuthContext } from '../context/AuthContext'

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign Up for TrackApp"
                submitButtonText="Sign Up"
                errorMessage={state.errorMessage}
                onSubmit={signup}
            />

            <NavLink
                message="Already have an account? Sign in here."
                routeName="Signin"
            />
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
    }
})

export default SignupScreen