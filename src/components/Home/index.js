import React from 'react'
import { Header } from '../reusables'
import { HomeContainer } from './style'
import Dashboard from '../Dashboard'
import { User } from '../../firebase'
import Settings from '../AccountSettings'

class Home extends React.Component {
	state = {
		openSettings: false
	}

	render() {
		const { openSettings } = this.state
		if (openSettings)
			return <Settings toggleSettings={this.toggleSettings} />
		return (
			<HomeContainer>
				<Header
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
