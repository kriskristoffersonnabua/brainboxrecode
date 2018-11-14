import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { deviceWidth } from '../../../../lib/device'
import TutorListContext from '../../../context/TutorListContext'
import { TutorCard, LoadingPage } from '../../reusables'
import { filter, conform } from 'lodash'
import { User } from '../../../firebase'
import TutorProfileView from '../../AccountSettings/AccountSettingsView'

class TutorList extends Component {
	state = {
		tutorprofile: null,
		loading: false
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	backToAllTutors = () => {}

	render() {
		let component
		if (this.state.loading) {
			return <LoadingPage text={'Getting Tutor Information'} />
		}
		if (this.state.tutorprofile) {
			component = (
				<View
					style={{
						flex: 1,
						width: deviceWidth
					}}>
					<View
						style={{
							width: deviceWidth,
							height: 30,
							padding: 5,
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<TouchableOpacity onPress={this.clearSelectedTutor}>
							<Text>Back</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text>Book One-On-One Tutorial</Text>
						</TouchableOpacity>
					</View>
					<TutorProfileView
						profile={this.state.tutorprofile}
						viewOnly
					/>
				</View>
			)
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
								onPress={() => this.fetchUser(tutor.uid)}
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

	fetchUser = uid => {
		this.setState({ loading: true })
		const userFetchPromise = User.getUserProfile(uid)
		userFetchPromise.then(value => {
			setTimeout(() => {
				this.setState({ tutorprofile: value, loading: false })
			}, 100)
		})
	}

	clearSelectedTutor = () => {
		this.setState({ tutorprofile: null })
	}
}

export default props => {
	return (
		<TutorListContext.Consumer>
			{props => <TutorList {...props} />}
		</TutorListContext.Consumer>
	)
}
