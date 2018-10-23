import { database, auth, firebase } from './firebase'
import { Alert } from 'react-native'
const facebook = require('react-native-fbsdk')
const {
	LoginManager,
	AccessToken,
	GraphRequest,
	GraphRequestManager
} = facebook

/*
  first_name: String
  last_name: String
  picture: String/Object
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
	static loginWithFacebook() {
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
			response => {
				if (response.isCancelled) {
					Alert.alert('Whoops', 'You canceled the sign in.')
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const credential = firebase.auth.FacebookAuthProvider.credential(
							data.accessToken
						)
						auth
							.signInWithCredential(credential)
							.then(response => {
								if (
									!!response &&
									response.additionalUserInfo.isNewUser
								) {
									const { user: { uid } } = response
									const infoRequest = new GraphRequest(
										'/me?fields=email,first_name,last_name,picture',
										null,
										async (error, graph) => {
											if (!!graph) {
												database
													.ref(`userprofile/${uid}`)
													.set(graph)
											} else if (!!error) {
												Alert.alert(
													'Whoops',
													'Something went wrong'
												)
											}
										}
									)
									new GraphRequestManager()
										.addRequest(infoRequest)
										.start()
								}
							})
							.catch(error =>
								Alert.alert('Whoops', 'Something went wrong.')
							)
					})
				}
			}
		)
	}

	static loginUserWithEmailPassword(data) {
		const { email, password } = data
		auth
			.signInWithEmailAndPassword(email, password)
			.then(response => {
				Alert.alert('Login Successfull.')
			})
			.catch(exception => Alert.alert(exception.message))
	}

	static signupUser(data) {
		const {
			email,
			password,
			first_name = '',
			last_name = '',
			birthday = Date.now(),
			contact = '',
			accountType = 1 //default to client
		} = data
		let accountEnabled = accountType === 0 ? false : true
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				if (!!response) {
					Alert.alert('Account Created')
					const {
						additionalUserInfo: { isNewUser },
						user: { uid }
					} = response
					if (isNewUser) {
						database.ref(`userprofile/${uid}`).set({
							first_name,
							last_name,
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

	static getLoggedInUser() {
		let user = auth.currentUser
		return user
	}

	static signoutUser() {
		!!auth && !!auth.signOut && auth.signOut()
	}

	static async getUserProfile() {
		// const {uid} = auth.currentUser
		// database.ref(`userprofile/${uid}`)
	}
}
