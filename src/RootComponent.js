import React from 'react'
import { LayoutAnimation, View, Text, TouchableOpacity } from 'react-native'
import { User } from './firebase'

import Login from './components/Login'
import Signup from './components/Signup'
import { LoadingPage } from './components/reusables'
import RootComponentContext from './context/RootComponentContext'
import { ThemedComponent } from './components/reusables'
import { CustomLayoutSpring } from '../lib/device'

class RootComponent extends React.Component {
	state = {
		showSignupPage: false
	}

	static getDerivedStateFromProps(nextProps) {
		const { loggedInUser, rootComponentLoading } = nextProps
		return {
			loggedInUser,
			rootComponentLoading
		}
	}

	render() {
		const {
			loggedInUser,
			rootComponentLoading,
			showSignupPage
		} = this.state
		let component
		if (rootComponentLoading) {
			component = <LoadingPage />
		} else if (!loggedInUser) {
			if (showSignupPage) {
				component = (
					<Signup
						toggleSignupLoginPage={this.toggleSignupLoginPage}
					/>
				)
			} else {
				component = (
					<Login toggleSignupLoginPage={this.toggleSignupLoginPage} />
				)
			}
		} else if (!!loggedInUser) {
			component = (
				<View>
					<TouchableOpacity onPress={User.signoutUser}>
						<Text>Signout</Text>
					</TouchableOpacity>
				</View>
			)
		}
		return <ThemedComponent>{component}</ThemedComponent>
	}

	toggleSignupLoginPage = () => {
		LayoutAnimation.configureNext(CustomLayoutSpring)
		this.setState(prevState => ({
			showSignupPage: !prevState.showSignupPage
		}))
	}
}

export default () => (
	<RootComponentContext.Consumer>
		{props => {
			return <RootComponent {...props} />
		}}
	</RootComponentContext.Consumer>
)
