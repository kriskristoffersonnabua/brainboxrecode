import firebase from 'react-native-firebase'
const database = firebase.database()
const auth = firebase.auth()

module.exports = {
	database,
	auth,
	firebase
}
