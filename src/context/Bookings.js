import React from 'react'
import RootComponentContext from './RootComponentContext'
import { database } from '../firebase/firebase'
import Loading from '../components/reusables'

const BookingsContext = React.createContext()

const BookingsProvider = class extends React.Component {
	state = {
		userprofile: null
	}

	fetchUserProfile = uid => {
		database
			.ref()
			.child('userprofile')
			.child(uid)
			.on('value', snapshot => {
				this.setState({
					userprofile: snapshot.val()
				})
			})
	}

	render() {
		return (
			<RootComponentContext.Consumer>
				{({ loggedInUser }) => {
					if (this.state.userprofile === null) {
						if (!!loggedInUser)
							this.fetchUserProfile(loggedInUser.uid)
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
