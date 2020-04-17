import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Spacer from './styling/Spacer'
import { Context as LocationContext } from '../context/LocationContext'

const TrackForm = () => {
    const { state: { name, isRecording, locations },
        startRecording,
        stopRecording,
        changeName } = useContext(LocationContext)

    console.log(locations.length)

    return (
        <>
            <Spacer>
                <Input placeholder="Enter Track Name" onChangeText={changeName} value={name} />
            </Spacer>
            <Spacer>
                {isRecording ? <Button title="Stop" onPress={stopRecording} /> : <Button title="Start Recording" onPress={startRecording} />}
            </Spacer>



        </>
    )
}

const styles = StyleSheet.create({})

export default TrackForm