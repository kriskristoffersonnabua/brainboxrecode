import { database, auth } from './firebase'
import { Alert, AsyncStorage } from 'react-native'

/*
  firstname: String
  lastname: String
  contact: String
  address: String
  birthday: Date.now()
  photo: String
  accountType: Number
  gender: String
  email: String
  password: String
  accountType: Number //0-tutor, 1-client, 2-admin
  */
export default class User {
	static loginUserWithEmailPassword(data) {
		const { email, password } = data
		auth.signInWithEmailAndPassword(email, password).then(response => {
			const { user: { metadata: { lastSignInTime }, uid } } = response
			let token = `${uid}-${lastSignInTime}`
			AsyncStorage.setItem('brainboxtoken', token)
		})
	}

	static signupUser(data) {
		const {
			email,
			password,
			firstname = '',
			lastname = '',
			middlename = '',
			birthday = Date.now(),
			contact = '',
			accountType = 1 //default to client
		} = data
		let accountEnabled = accountType === 0 ? false : true
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				if (!!response) {
					const {
						additionalUserInfo: { isNewUser },
						user: { uid }
					} = response
					if (isNewUser) {
						database.ref(`userprofile/${uid}`).set({
							firstname,
							lastname,
							middlename,
							birthday,
							contact,
							accountType,
							accountEnabled
						})
					}
				}
			})
			.catch(exception => {
				Alert.alert(exception.message)
			})
	}

	static updateProfile(data) {
		const { uid, ...dataToUpdate } = data
		if (!!data && !!uid) {
			database
				.ref(`userprofile/${uid}`)
				.update(dataToUpdate, function(error) {
					if (!!error) {
						Alert.alert(error.message)
					} else Alert.alert('Update Successful.')
				})
		}
	}
}
