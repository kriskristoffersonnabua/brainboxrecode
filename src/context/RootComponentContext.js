import React from 'react'
import { User } from '../firebase'
import { auth } from '../firebase/firebase'
import { assign } from 'lodash'

const RootComponentContext = React.createContext()

const RootComponentProvider = class extends React.Component {
	state = {
		loggedInUser: null,
		rootComponentLoading: true
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	componentDidMount() {
		auth.onAuthStateChanged(user => {
			setTimeout(() => {
				this.setState({
					loggedInUser: user,
					rootComponentLoading: false
				})
			}, 500)
		})
	}

	render() {
		return (
			<RootComponentContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</RootComponentContext.Provider>
		)
	}
}

export { RootComponentContext as default, RootComponentProvider }
