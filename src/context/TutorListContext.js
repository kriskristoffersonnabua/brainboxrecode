import React from 'react'
import { User } from '../firebase'
import { database } from '../firebase/firebase'
import { forIn, keys } from 'lodash'

const TutorListContext = React.createContext()

const TutorListProvider = class extends React.Component {
	state = {
		tutors: []
	}

	componentDidMount() {
		database
			.ref('userprofile')
			.orderByChild('accountType')
			.equalTo(0)
			.once('value')
			.then(snapshot => {
				let users = snapshot.val()
				tutors = []
				forIn(users, (values, key) => {
					tutors.push({ uid: key, ...values })
				})
				this.setState({ tutors })
			})
			.catch(exception => console.log(exception))
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
