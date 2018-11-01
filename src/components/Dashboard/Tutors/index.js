import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { deviceWidth } from '../../../../lib/device'
import TutorListContext from '../../../context/TutorListContext'
import { TutorCard } from '../../reusables'
import { filter, conform } from 'lodash'
// import TutorAccountSettings from '../../AccountSettings/TutorAccountSettings';

class TutorList extends Component {
	state = {
		tutorId: null
	}

	static getDerivedStateFromProps(nextProps) {
		console.log(nextProps)
		return nextProps
	}

	backToAllTutors = () => {}

	render() {
		let component
		if (this.state.tutorId) {
			// component = (
			// 	<TutorAccountSettings
			// 		back={this.backToAllTutors}
			// 		tutorId={this.state.tutorId}
			// 	/>
			// )
		} else {
			component =
				!!this.props.tutors &&
				!!this.props.tutors.length &&
				this.props.tutors.map((tutor, index) => {
					if (tutor.accountEnabled) {
						return (
							<TutorCard
								key={tutor.uid}
								tutorName={`${tutor.first_name} ${
									tutor.last_name
								}`}
								available
							/>
						)
					} else null
				})
		}
		return (
			<ScrollView
				style={{
					width: deviceWidth
				}}>
				<View
					style={{
						width: '100%',
						justifyContent: 'space-around',
						padding: 10
					}}
				/>
				{component}
			</ScrollView>
		)
	}

	showTutorInformation = tutorId => {}

	clearSelectedTutor = () => {}
}

export default props => {
	return (
		<TutorListContext.Consumer>
			{props => <TutorList {...props} />}
		</TutorListContext.Consumer>
	)
}
