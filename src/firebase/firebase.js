import firebase from 'react-native-firebase'
const database = firebase.database()
const auth = firebase.auth()

console.log(auth)
console.log(database)
console.log(firebase)
module.exports = {
	database,
	auth,
	firebase
}
