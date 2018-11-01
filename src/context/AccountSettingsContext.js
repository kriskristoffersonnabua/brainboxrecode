import React from 'react'
import { database } from '../firebase/firebase'
import { assign } from 'lodash'

const AccountSettingsContext = React.createContext()
import RootComponentContext from './RootComponentContext'

const AccountSettingsProvider = class extends React.Component {
	state = {}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	render() {
		return (
			<RootComponentContext.Consumer>
				{({ loggedInUser }) => (
					<AccountSettingsContext.Provider
						value={{ ...this.state, loggedInUser }}>
						{this.props.children}
					</AccountSettingsContext.Provider>
				)}
			</RootComponentContext.Consumer>
		)
	}
}

export { AccountSettingsContext as default, AccountSettingsProvider }
