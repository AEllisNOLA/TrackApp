import * as Location from 'expo-location'

// 10 meters 
const tenMetersWithDegrees = 0.0001;

// return an object that is a fake location reading
const getLocation = increment => {
    return {
        timestamp: 1,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: -89.767110 + increment * tenMetersWithDegrees,
            latitude: 30.291410 + increment * tenMetersWithDegrees
        }
    }
}

let counter = 0;

// For testing: Every second, fake a location change
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    })
    counter++
}, 1000)