import React from 'react'
import RootComponentContext from './RootComponentContext'
import { database } from '../firebase/firebase'
import Loading from '../components/reusables'
import { assign } from 'lodash'

const BookingsContext = React.createContext()

const BookingsProvider = class extends React.Component {
	state = {
		userprofile: null
	}

	fetchUserProfile = uid => {
		this.controller = database
			.ref()
			.child('userprofile')
			.child(uid)
			.on('value', snapshot => {
				let userprofile = snapshot.val()
				assign(userprofile, { uid })
				this.setState({ userprofile })
			})
	}

	componentWillUnmount() {
		this.controller = null
	}

	render() {
		return (
			<RootComponentContext.Consumer>
				{({ loggedInUser }) => {
					if (!!!this.state.userprofile) {
						if (!!loggedInUser)
							this.fetchUserProfile(loggedInUser.uid)
					} else if (!!this.state.userprofile) {
						if (!!loggedInUser) {
							if (
								this.state.userprofile.uid != loggedInUser.uid
							) {
								this.fetchUserProfile(loggedInUser.uid)
							}
						}
					}
					return (
						<BookingsContext.Provider
							value={{ ...this.state, loggedInUser }}>
							{this.props.children}
						</BookingsContext.Provider>
					)
				}}
			</RootComponentContext.Consumer>
		)
	}
}

export { BookingsContext as default, BookingsProvider }
