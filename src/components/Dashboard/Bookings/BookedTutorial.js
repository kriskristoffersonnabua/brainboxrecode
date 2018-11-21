import React, { Component } from 'react'
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native'
import { Dash, LocalImage, String, Button, Subjects } from '../../reusables'
import MapView, { Marker } from 'react-native-maps'
import SubmitFeedbackModal from './SubmitFeedbackModal'
import LearnersProgressReport from './LPR'
import { database } from '../../../firebase/firebase'

const Tutee = props => {
	return (
		<TouchableOpacity
			{...props}
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: 35,
				borderWidth: 1,
				padding: 10,
				borderRadius: 5,
				marginBottom: 10
			}}>
			<String
				text={`${props.tutee.firstname} ${props.tutee.lastname}`}
				fontSize={11}
			/>
		</TouchableOpacity>
	)
}

const ScheduledBooking = props => {
	const {
		date,
		duration,
		timeschedule: { start },
		tutorialCompleted
	} = props.schedule
	return (
		<View
			elevation={2}
			style={{
				width: '100%',
				height: 40,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderRadius: 5,
				paddingLeft: 10,
				paddingRight: 10,
				paddingTop: 5,
				paddingBottom: 5,
				backgroundColor: tutorialCompleted ? '#BDF287' : '#e66464',
				marginBottom: 10
			}}>
			<String text={new Date(date).toLocaleDateString()} />
			<String text={new Date(start).toLocaleTimeString()} />
			<String text={`${duration} hr/s`} />
		</View>
	)
}

class BookedTutorial extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstname: 'Kris Kristofferson',
			openSubmitFeedbackModal: false,
			lastname: 'Nabua',
			address: 'V&G Subdivision, Blk. 2, Phase 4, Tacloban City, Leyte',
			addressObject: {},
			subjects: ['College Algebra', 'Science and Health'],
			scheduledBookings: [],
			progressReport: [],
			isLPRModalVisible: false,
			tutees: [
				{
					firstname: 'Kris',
					lastname: 'Nabua'
				},
				{
					firstname: 'Kris',
					lastname: 'Nabua'
				}
			]
		}
	}

	_toggleFeedbackModal = () => {
		this.setState({
			openSubmitFeedbackModal: !this.state.openSubmitFeedbackModal
		})
	}

	toggleLPRModal = () => {
		this.setState(prevState => ({
			isLPRModalVisible: !prevState.isLPRModalVisible
		}))
	}

	toggleFeedbackModal = () => {
		this.setState(prevState => ({
			openSubmitFeedbackModal: !prevState.openSubmitFeedbackModal
		}))
	}

	submitFeedback = ({ rating, remarks }) => {
		let feedback = {
			appointmentId: this.props.selectedAppointment.appointmentId,
			tutorId: this.props.selectedAppointment.tutorId,
			rating,
			remarks
		}

		database
			.ref()
			.child('feedback')
			.push(feedback)

		database
			.ref()
			.child('appointment')
			.child(this.props.selectedAppointment.appointmentId)
			.update({ feedbackSubmitted: true })

		this.forceUpdate()
	}

	render() {
		return (
			<ScrollView
				style={{
					width: '100%'
				}}>
				<SubmitFeedbackModal
					cancelFeedbackModal={() => {}}
					toggleFeedbackModal={this._toggleFeedbackModal}
					feedbackModal={this.state.openSubmitFeedbackModal}
					submitFeedback={this.submitFeedback}
				/>
				<LearnersProgressReport
					isVisible={this.state.isLPRModalVisible}
					toggleLPRModal={this.toggleLPRModal}
					progressReport={this.state.progressReport}
					lpr={this.props.lpr}
				/>
				<View style={styles.container}>
					<View
						style={{
							width: '100%',
							height: 25
						}}>
						<TouchableOpacity
							onPress={this.props.clearSelect}
							style={{
								flexDirection: 'row',
								width: 60,
								justifyContent: 'space-around',
								alignItems: 'center'
							}}>
							<LocalImage
								source={require('../../../../assets/images/icons/backButton.png')}
								resize
								newWidth={15}
								newHeight={15}
							/>
							<Text>BACK</Text>
						</TouchableOpacity>
					</View>
					<String
						text={'Booked Tutorial'}
						style={{ marginBottom: 10 }}
					/>
					<Dash
						style={{ width: '100%', height: 2, marginBottom: 10 }}
					/>
					{!!this.props.userprofile &&
					this.props.userprofile.accountType === 1 ? (
						<Button
							style={{ marginBottom: 10 }}
							fontSize={12}
							text={'Learners Progress Report'}
							onPress={this.toggleLPRModal}
							type="cancel"
							width={204}
							height={34}
						/>
					) : !Boolean(
						this.props.selectedAppointment.feedbackSubmitted
					) ? (
						<Button
							style={{ marginBottom: 10 }}
							fontSize={12}
							text={'Submit Feedback'}
							onPress={this.toggleFeedbackModal}
							type="confirm"
							width={204}
							height={34}
						/>
					) : (
						<String text={'Feedback already submitted.'} />
					)}
					<Dash
						style={{ width: '100%', height: 2, marginBottom: 10 }}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%',
							marginBottom: 10
						}}>
						<String text={'Tutor/s:'} />
						<String
							text={`${this.props.tutorprofile.first_name} ${
								this.props.tutorprofile.last_name
							}`}
							style={{ textAlign: 'right' }}
						/>
					</View>
					<Dash
						style={{ width: '100%', height: 2, marginBottom: 10 }}
					/>
					<String
						text={'Tutee/s:'}
						style={{ marginBottom: 10, alignSelf: 'flex-start' }}
					/>
					{this.props.selectedAppointment.tutees.map(
						(tutee, index) => {
							return <Tutee tutee={tutee} key={index} />
						}
					)}
					<Dash
						style={{
							width: '100%',
							height: 2,
							marginTop: 10,
							marginBottom: 10
						}}
					/>
					<String
						text={'Address:'}
						style={{ marginBottom: 10, alignSelf: 'flex-start' }}
					/>
					<String
						text={this.state.address}
						style={{ marginBottom: 10 }}
					/>
					<MapView
						initialRegion={{
							latitude:
								this.props.selectedAppointment.address
									.latitude || 11.249999,
							longitude:
								this.props.selectedAppointment.address
									.longitude || 125.0,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
						style={{
							height: 250,
							width: '100%',
							marginBottom: 10
						}}
						provider="google"
						minZoomLevel={15}
						zoomControlEnabled={true}
						ref="maps">
						<Marker
							coordinate={{
								latitude:
									this.props.selectedAppointment.address
										.latitude || 11.249999,
								longitude:
									this.props.selectedAppointment.address
										.longitude || 125.0
							}}
						/>
					</MapView>
					<Dash
						style={{
							width: '100%',
							height: 2,
							marginTop: 10,
							marginBottom: 10
						}}
					/>
					<String
						text={'Subjects:'}
						style={{ marginBottom: 10, alignSelf: 'flex-start' }}
					/>
					<Subjects
						allSubjects={() => {}}
						readOnly
						subjects={this.props.selectedAppointment.subjects}
					/>
					<Dash
						style={{
							width: '100%',
							height: 2,
							marginTop: 10,
							marginBottom: 10
						}}
					/>
					<String
						text={'Scheduled Tutorial:'}
						style={{ marginBottom: 10, alignSelf: 'flex-start' }}
					/>
					<View
						style={{
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						{this.props.lpr.map(lpr => {
							return (
								<ScheduledBooking
									key={lpr.lprid}
									schedule={lpr}
								/>
							)
						})}
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#fff',
		paddingBottom: 30
	}
})

export default BookedTutorial
