import React, { Component } from 'react'
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'
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
							width: deviceWidth,
							height: 'auto',
							backgroundColor: '#fff',
							alignSelf: 'center',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}>
						<View
							style={{
								width: '100%',
								height: 30,
								padding: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
							<TouchableOpacity
								onPress={this.clearSelectedTutor}
								style={styles.backButton}>
								<LocalImage
									source={require('../../../../assets/images/icons/backButton.png')}
									resize
									newWidth={25}
									newHeight={15}
								/>
								<Text>BACK</Text>
							</TouchableOpacity>
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
						<Dash style={{ marginTop: 10, marginBottom: 0 }} />
						<ScrollView
							style={{
								width: deviceWidth,
								height: '100%',
								marginBottom: 150
							}}>
							<TutorProfileView
								profile={this.state.tutorprofile}
								viewOnly
							/>
						</ScrollView>
					</View>
				)
			}
		} else {
			component = (
				<ScrollView style={{ width: deviceWidth }}>
					{!!this.props.tutors &&
						!!this.props.tutors.length &&
						this.props.tutors.map((tutor, index) => {
							if (tutor.accountEnabled) {
								return (
									<TutorCard
										key={tutor.uid}
										tutorName={`${tutor.first_name} ${
											tutor.last_name
										}`}
										tutorInfo={tutor}
										style={{ marginTop: 10 }}
										available
										onPress={() =>
											this.fetchUser(tutor.uid)
										}
									/>
								)
							} else null
						})}
				</ScrollView>
			)
		}
		return (
			<View
				style={{
					width: deviceWidth,
					paddingTop: 10,
					backgroundColor: '#fafafa',
					flex: 1
				}}>
				{component}
			</View>
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

const styles = StyleSheet.create({
	backButton: {
		height: 'auto',
		flexDirection: 'row',
		alignItems: 'center'
	}
})

export default props => {
	return (
		<TutorListContext.Consumer>
			{props => <TutorList {...props} />}
		</TutorListContext.Consumer>
	)
}
