import React from 'react'
import { Alert } from 'react-native'
import { Header } from '../reusables'
import { HomeContainer } from './style'
import Dashboard from '../Dashboard'
import { User } from '../../firebase'
import { database } from '../../firebase/firebase'
import Settings from '../AccountSettings'

class Home extends React.Component {
	state = {
		openSettings: false,
		userprofile: null
	}

	fetchUserProfile = () => {
		const { loggedInUser = null } = this.props
		let promise = User.getUserProfile(loggedInUser.uid)
		promise.then(value => {
			setTimeout(() => {
				this.setState({ userprofile: value, fetchingProfile: false })
			}, 500)
		})
	}

	render() {
		if (!!!this.state.userprofile) {
			this.fetchUserProfile()
		}

		const { openSettings, userprofile } = this.state
		if (openSettings)
			return <Settings toggleSettings={this.toggleSettings} />
		let profilepicture =
			(!!userprofile &&
				!!userprofile.picture &&
				!!userprofile.picture.data &&
				userprofile.picture.data) ||
			false
		return (
			<HomeContainer>
				<Header
					profilepicture={profilepicture}
					signOut={User.signoutUser}
					toggleSettings={this.toggleSettings}
				/>
				<Dashboard />
			</HomeContainer>
		)
	}

	openSettings = () => {
		this.setState({ openSettings: true })
	}

	toggleSettings = () => {
		this.setState({ openSettings: !this.state.openSettings })
	}
}

export default Home
