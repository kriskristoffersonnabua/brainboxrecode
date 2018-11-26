import React from 'react'
import { Alert } from 'react-native'
import { User } from '../firebase'
import { database } from '../firebase/firebase'
import { forIn, keys } from 'lodash'

const TutorListContext = React.createContext()

const TutorListProvider = class extends React.Component {
	state = {
		tutors: []
	}

	componentDidMount() {
		this.controller = database
			.ref('userprofile')
			.orderByChild('accountType')
			.equalTo(1)
			.once('value', snapshot => {
				let users = snapshot.val()
				tutors = []
				forIn(users, (values, key) => {
					tutors.push({ uid: key, ...values })
				})
				this.setState({ tutors })
			})
	}

	componenWillUnmount() {
		this.controller = null
	}

	render() {
		return (
			<TutorListContext.Provider value={{ ...this.state }}>
				{this.props.children}
			</TutorListContext.Provider>
		)
	}
}

export { TutorListContext as default, TutorListProvider }
