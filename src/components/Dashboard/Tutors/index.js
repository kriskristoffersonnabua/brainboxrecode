import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { deviceWidth } from '../../../../lib/device'
import TutorListContext from '../../../context/TutorListContext'
import { TutorCard, LoadingPage, Button, Dash } from '../../reusables'
import { filter, conform } from 'lodash'
import { User } from '../../../firebase'
import TutorProfileView from '../../AccountSettings/AccountSettingsView'
import TutorialBooking from '../Services/TutorialBooking'

class TutorList extends Component {
	state = {
		tutorprofile: null,
		loading: false,
		tutorId: null,
		showForm: false
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	backToAllTutors = () => {}

	render() {
		const { showForm } = this.state
		let component
		if (this.state.loading) {
			return <LoadingPage text={'Getting tutor information ...'} />
		}
		if (this.state.tutorprofile) {
			if (showForm) {
				component = (
					<TutorialBooking
						cancelTutorSelection={this.unshowForm}
						tutorId={this.state.tutorId}
					/>
				)
			} else {
				component = (
					<View
						style={{
							flex: 1,
							width: '98%',
							backgroundColor: '#fff',
							alignSelf: 'center',
							justifyContent: 'flex-start',
							alignItems: 'center',
							padding: 10
						}}>
						<View
							style={{
								width: '100%',
								height: 30,
								padding: 5,
								flexDirection: 'row',
								justifyContent: 'space-between'
							}}>
							<Button
								text={'Back To List'}
								style={{ height: 30 }}
								onPress={this.clearSelectedTutor}
								textStyle={{ fontSize: 10 }}
								type="cancel"
								style={{
									paddingLeft: 10,
									paddingRight: 10,
									width: 'auto'
								}}
							/>
							<Button
								text={'Book A Tutorial'}
								style={{ height: 30 }}
								onPress={this.showForm}
								textStyle={{ fontSize: 10 }}
								style={{
									paddingLeft: 10,
									paddingRight: 10,
									width: 'auto'
								}}
							/>
						</View>
						<Dash />
						<TutorProfileView
							profile={this.state.tutorprofile}
							viewOnly
						/>
					</View>
				)
			}
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
				this.setState({
					tutorprofile: value,
					loading: false,
					tutorId: uid
				})
			}, 100)
		})
	}

	clearSelectedTutor = () => {
		this.setState({ tutorprofile: null, tutorId: null })
	}

	showForm = () => this.setState({ showForm: true })

	unshowForm = () => this.setState({ showForm: false })
}

export default props => {
	return (
		<TutorListContext.Consumer>
			{props => <TutorList {...props} />}
		</TutorListContext.Consumer>
	)
}
