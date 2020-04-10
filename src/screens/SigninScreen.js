import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import AuthForm from '../components/reusable/AuthForm'
import NavLink from '../components/reusable/NavLink'
import { Context as AuthContext } from '../context/AuthContext'


const SigninScreen = () => {
    const { state, signin } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign In to TrackApp"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />

            <NavLink
                message="Don't have an account? Sign up here."
                routeName="Signup"
            />

        </View>
    )
}

SigninScreen.navigationOptions = () => {
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

export default SigninScreen