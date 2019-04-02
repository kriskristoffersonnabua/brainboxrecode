import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LoadingPage } from '../../reusables'
import { database } from '../../../firebase/firebase'
import { forIn, filter } from 'lodash'
import RootComponentContext from '../../../context/RootComponentContext'

const RecordsContext = React.createContext()

class RecordsClass extends Component {
	state = {
		fetchingData: true,
		lprs: null
	}

	fetchLPRS = () => {
		const { tid } = this.props
		if (!!!this.datacontroller && !!tid && this._mounted) {
			this.datacontroller = database
				.ref()
				.child('lpr')
				.orderByChild('tutorId')
				.equalTo(tid)
				.on('value', snapshot => {
					let lprsSnapshot = snapshot.val()

					let lprs = []
					forIn(lprsSnapshot, (lpr, key) => {
						lprs.push({ lprid: key, ...lpr })
					})
					lprs = filter(lprs, lpr => {
						return !!lpr.tutorialCompleted
					})
					this.setState({ lprs, fetchingData: false })
				})
		}
	}

	componentWillUnmount() {
		this.datacontroller = null
		this._mounted = false
	}

	componentDidMount() {
		this._mounted = true
	}

	render() {
		if (!!!this.state.lprs) {
			this.fetchLPRS()
		}

		return (
			<RecordsContext.Provider value={this.state}>
				{this.props.children}
			</RecordsContext.Provider>
		)
	}
}

const RecordsProvider = ownprops => {
	return (
		<RootComponentContext.Consumer>
			{({ loggedInUser }) => {
				// if (!!!loggedInUser) return <LoadingPage />

				return (
					<RecordsClass tid={(!!loggedInUser && loggedInUser.uid) || ''}>
						{ownprops.children}
					</RecordsClass>
				)
			}}
		</RootComponentContext.Consumer>
	)
}

export { RecordsContext as default, RecordsProvider }
