import React, { Component } from 'react'
import {
	Alert,
	DatePickerAndroid,
	Keyboard,
	Modal,
	Picker,
	ScrollView,
	StyleSheet,
	TimePickerAndroid,
	TouchableOpacity,
	View,
	Text,
	AsyncStorage
} from 'react-native'
import { deviceWidth } from '../../../../../lib/device'
import {
	LocalImage,
	String,
	Textfield,
	RadioButton,
	Button,
	Subjects,
	Dash
} from '../../../reusables'
import MapView, { Marker } from 'react-native-maps'
import RNGooglePlaces from 'react-native-google-places'
import Scheduler from './Scheduler'
import { AccountType } from '../../../../../lib/constants'
import { getDates, generateBookedSchedules, generateLPR } from './controller'
import RootComponentContext from '../../../../context/RootComponentContext'
import { Appointment, LPR } from '../../../../firebase/appointment'
import { database } from '../../../../firebase/firebase'
import { forIn, filter } from 'lodash'
const { createAppointment } = Appointment
const { createGeneratedLPR } = LPR

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
				borderColor: '#979797',
				borderRadius: 5,
				marginBottom: 10
			}}>
			<LocalImage
				source={
					props.add
						? require('../../../../../assets/images/icons/plusIcon.png')
						: require('../../../../../assets/images/icons/minusIcon.png')
				}
				originalWidth={17}
				originalHeight={17}
				style={{
					position: 'absolute',
					left: 10
				}}
			/>
			<String
				text={`${props.tutee.firstname} ${props.tutee.lastname}`}
				fontSize={11}
			/>
		</TouchableOpacity>
	)
}

const CustomSchedule = props => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					padding: 10,
					borderWidth: 1,
					borderColor: '#979797',
					borderRadius: 5,
					justifyContent: 'space-between',
					marginBottom: 5
				}}>
				<String text={props.schedule.ottDateString} />
				<String text={props.schedule.ottTimeString} />
				<String text={props.schedule.ottHours + ' hour/s.'} />
			</View>
		</TouchableOpacity>
	)
}

const AddButtonIcon = props => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
				width: 156,
				alignSelf: 'flex-start',
				marginLeft: 10,
				marginTop: 5,
				marginBottom: 5
			}}>
			<LocalImage
				source={require('../../../../../assets/images/icons/plusIcon.png')}
				originalWidth={17}
				originalHeight={17}
				style={{ marginRight: 15 }}
			/>
			<String
				text={props.text}
				fontSize={11}
				style={{ textAlign: 'left' }}
			/>
		</TouchableOpacity>
	)
}

class TutorialBooking extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subjects: [],
			centerBased: true,
			location: 'somewhere',
			ott: false,
			owt: false,
			omt: false,
			// one time tutorial states
			ottDate: null,
			ottDateString: '',
			ottTime: null,
			ottTimeString: '',
			ottHours: '',
			// one week tutorial states
			owtStartDate: null,
			owtStartDateString: '',
			owtEndDate: null,
			owtEndDateString: '',
			owtSchedule: null,
			// one month tutorial states
			omtStartDate: null,
			omtStartDateString: '',
			omtEndDate: null,
			omtEndDateString: '',
			omtSchedule: null,
			//add new tutee modal
			newTuteeModalVisible: false,
			newTuteeFirstname: '',
			newTuteeLastname: '',
			newTuteeBirthday: null,
			newTuteeBirthdayString: '',
			newTuteeSchool: '',
			//add existine tutee modal
			existingTuteeModalVisible: false,
			//tutees
			existingTutees: [
				{
					firstname: 'April Shayne',
					lastname: 'Cadiz'
				}
			],
			//data
			tutees: [],
			customDates: [],
			tutorId: props.tutorId,
			//default address if user is choosing center based
			address: {
				address:
					'165 Avenida Veteranos, Downtown, Tacloban City, 6500 Leyte, Philippines',
				east: 125.00217583029146,
				latitude: 11.24156750000001,
				longitude: 125.00101953124998,
				name: `11°14'29.6"N 125°00'03.7"E`,
				north: 11.243089380291503,
				placeID: '7Q3762R2+JCCP',
				south: 11.240391419708498
			}
		}
	}

	addCustomDate = () => {
		const {
			ottDate,
			ottDateString,
			ottTime,
			ottTimeString,
			ottHours,
			customDates
		} = this.state
		customDates.push({
			ottDate,
			ottDateString,
			ottTime,
			ottTimeString,
			ottHours
		})
		this.setState({
			customDates,
			ottDate: null,
			ottDateString: '',
			ottTime: null,
			ottTimeString: '',
			ottHours: ''
		})
	}

	popCustomDate = index => {
		const { customDates } = this.state
		customDates.splice(index, 1)
		this.setState({ customDates })
	}

	componentDidMount() {
		// fetch all bookedschedules of this tutor
		if (!!this.props.tutorId) {
			database
				.ref('lpr')
				.orderByChild('tutorId')
				.equalTo(this.props.tutorId)
				.on('value', snapshot => {
					let data = snapshot.val()
					let tutorialSchedules = []
					forIn(data, (values, key) => {
						tutorialSchedules.push({
							lprid: key,
							...values
						})
					})
					tutorialSchedules = filter(tutorialSchedules, data => {
						return !data.tutorialCompleted
					})
					this.setState({ tutorialSchedules })
				})
		}
	}

	openSearchModal() {
		RNGooglePlaces.openPlacePickerModal({
			latitude: 11.241568,
			longitude: 125.001022,
			radius: 0.2
		})
			.then(place => {
				this.setState(
					{
						address: place
					},
					() => {
						const { latitude, longitude } = place
						this.refs.maps.animateToCoordinate(
							{ latitude, longitude },
							10
						)
					}
				)
			})
			.catch(error => console.log(error.message))
	}

	render() {
		return (
			<ScrollView style={{ flex: 1, backgroundColor: 'blue' }}>
				<View style={styles.container}>
					<View style={styles.backButtonContainer}>
						<TouchableOpacity
							style={styles.backButton}
							onPress={this.props.cancelTutorSelection}>
							<LocalImage
								source={require('../../../../../assets/images/icons/backButton.png')}
								resize
								newWidth={15}
								newHeight={15}
							/>
							<String text={'BACK'} fontSize={11} />
						</TouchableOpacity>
					</View>
					<String
						bold
						text={'Tutorial Booking'}
						fontSize={11}
						style={{ padding: 10 }}
					/>
					<Dash
						style={{
							width: deviceWidth * 0.95,
							height: 2,
							marginBottom: 10
						}}
					/>
					<String
						bold
						text={'TUTEE/S:'}
						fontSize={11}
						style={{ alignSelf: 'flex-start', marginBottom: 10 }}
					/>
					{this.state.tutees.map((tutee, index) => {
						return (
							<Tutee
								onPress={e => this._popTutee(index)}
								key={index}
								index={index}
								tutee={tutee}
							/>
						)
					})}
					<Modal
						transparent={true}
						onRequestClose={() =>
							this.setState({ existingTuteeModalVisible: false })
						}
						visible={this.state.existingTuteeModalVisible}>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'rgba(43,43,43,0.24)'
							}}>
							<View
								style={{
									width: '90%',
									backgroundColor: '#fafafa',
									justifyContent: 'center',
									borderRadius: 5,
									padding: 10
								}}>
								<String
									text={'Tap on a tutee below:'}
									style={{ marginBottom: 10 }}
								/>
								{this.state.existingTutees.map(
									(tutee, index) => {
										return (
											<Tutee
												add
												onPress={e =>
													this._addExistingTutee(
														index
													)
												}
												key={index}
												index={index}
												tutee={tutee}
											/>
										)
									}
								)}
								<Button
									width={55}
									type="cancel"
									text={'Cancel'}
									fontSize={12}
									style={{
										alignSelf: 'flex-start',
										height: 30
									}}
									onPress={() =>
										this.setState({
											existingTuteeModalVisible: !this
												.state.existingTuteeModalVisible
										})
									}
								/>
							</View>
						</View>
					</Modal>
					<Modal
						onRequestClose={() => {
							this.setState({ newTuteeModalVisible: false })
						}}
						transparent={true}
						visible={this.state.newTuteeModalVisible}>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'rgba(43,43,43,0.24)'
							}}>
							<View
								style={{
									width: '90%',
									backgroundColor: '#fafafa',
									justifyContent: 'center',
									borderRadius: 5,
									padding: 10
								}}>
								<Textfield
									onChangeText={value => {
										this.setState({
											newTuteeFirstname: value
										})
									}}
									placeholder="Firstname"
									style={{ width: '100%' }}
								/>
								<Textfield
									onChangeText={value => {
										this.setState({
											newTuteeLastname: value
										})
									}}
									placeholder="Lastname"
									style={{ width: '100%' }}
								/>
								<Textfield
									datepicker
									callback={({ newDate, newDateString }) => {
										this.setState({
											newTuteeBirthday: newDate,
											newTuteeBirthdayString: newDateString
										})
									}}
									value={this.state.newTuteeBirthdayString}
									placeholder="Birthday"
									style={{ width: '100%' }}
								/>
								<Textfield
									onChangeText={value => {
										this.setState({ newTuteeSchool: value })
									}}
									placeholder="School"
									style={{ width: '100%' }}
								/>
								<View
									style={{
										width: '100%',
										justifyContent: 'flex-start',
										alignItems: 'center',
										flexDirection: 'row',
										marginTop: 10
									}}>
									<Button
										width={80}
										type="confirm"
										text={'Add Tutee'}
										fontSize={12}
										style={{
											marginRight: 10
										}}
										onPress={this._addNewTutee}
									/>
									<Button
										width={55}
										type="cancel"
										text={'Cancel'}
										fontSize={12}
										onPress={() =>
											this.setState({
												newTuteeModalVisible: !this
													.state.newTuteeModalVisible
											})
										}
									/>
								</View>
							</View>
						</View>
					</Modal>
					<AddButtonIcon
						text={'Add Existing Tutee'}
						onPress={() =>
							this.setState({ existingTuteeModalVisible: true })
						}
					/>
					<AddButtonIcon
						text={'Add New Tutee'}
						onPress={() =>
							this.setState({ newTuteeModalVisible: true })
						}
					/>
					<Dash
						style={{
							width: deviceWidth * 0.95,
							height: 2,
							marginBottom: 10,
							marginTop: 10
						}}
					/>
					<String
						bold
						text={'LOCATION:'}
						fontSize={11}
						style={{ alignSelf: 'flex-start', marginBottom: 10 }}
					/>
					<RadioButton
						style={{ marginLeft: 10, marginBottom: 10 }}
						active={this.state.centerBased}
						text={'Center-based Tutorial'}
						onPress={() =>
							this.setState({
								centerBased: true,
								address: {
									address:
										'165 Avenida Veteranos, Downtown, Tacloban City, 6500 Leyte, Philippines',
									east: 125.00217583029146,
									latitude: 11.24156750000001,
									longitude: 125.00101953124998,
									name: `11°14'29.6"N 125°00'03.7"E`,
									north: 11.243089380291503,
									placeID: '7Q3762R2+JCCP',
									south: 11.240391419708498
								}
							})
						}
					/>
					<RadioButton
						style={{ marginLeft: 10, marginBottom: 10 }}
						active={!this.state.centerBased}
						text={'home-based Tutorial'}
						onPress={() => this.setState({ centerBased: false })}
					/>
					{!this.state.centerBased && (
						<Textfield
							placeholder={'Address'}
							onChangeText={() => {}}
							key="search place"
							style={{
								width: '100%',
								marginBottom: 10
							}}
							onFocus={evt => {
								Keyboard.dismiss()
								this.openSearchModal()
							}}
							value={
								(this.state.address &&
									this.state.address.address) ||
								''
							}
						/>
					)}
					{!this.state.centerBased && (
						<MapView
							initialRegion={{
								latitude: 11.249999,
								longitude: 125.0,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421
							}}
							provider="google"
							minZoomLevel={15}
							zoomControlEnabled={true}
							ref="maps"
							style={{
								height: 250,
								width: '100%',
								marginBottom: 10
							}}>
							{this.state.address && (
								<Marker
									coordinate={{
										latitude: this.state.address.latitude,
										longitude: this.state.address.longitude
									}}
								/>
							)}
						</MapView>
					)}
					<Dash
						style={{
							width: deviceWidth * 0.95,
							height: 2,
							marginBottom: 10
						}}
					/>
					<String
						bold
						text={'SUBJECT/S:'}
						fontSize={11}
						style={{ alignSelf: 'flex-start', marginBottom: 5 }}
					/>
					<Subjects
						subjects={this.state.subjects}
						allSubjects={subjects => this.setState({ subjects })}
					/>
					<Dash
						style={{
							width: deviceWidth * 0.95,
							height: 2,
							marginBottom: 10
						}}
					/>
					<String
						bold
						text={'SCHEDULE:'}
						fontSize={11}
						style={{ alignSelf: 'flex-start', marginBottom: 10 }}
					/>
					<RadioButton
						style={{ marginLeft: 10, marginBottom: 10 }}
						active={this.state.ott}
						text={'Custom Schedule Tutorial'}
						onPress={() => {
							this.setState({ ott: true, owt: false, omt: false })
						}}
					/>
					<View
						style={{
							width: '100%',
							marginBottom: 10,
							paddingLeft: 30
						}}>
						{this.state.customDates.map((schedule, index) => {
							return (
								<CustomSchedule
									onPress={() => this.popCustomDate(index)}
									key={index}
									schedule={schedule}
								/>
							)
						})}
						<View
							style={{
								width: '100%',
								flexDirection: 'row',
								marginBottom: 10
							}}>
							<Textfield
								datepicker
								callback={({
									newDate: date,
									newDateString: dateString
								}) => {
									this.setState({
										ottDate: date,
										ottDateString: dateString,
										ott: true,
										owt: false,
										omt: false
									})
								}}
								placeholder={'Date'}
								value={this.state.ottDateString}
								style={{
									flex: 3
								}}
							/>
							<Textfield
								placeholder={'Time'}
								style={{
									flex: 2
								}}
								timepicker
								callback={({
									newTime: time,
									newTimeString: timeString
								}) =>
									this.setState({
										ottTime: time,
										ottTimeString: timeString,
										ott: true,
										owt: false,
										omt: false
									})
								}
								value={this.state.ottTimeString}
							/>
							<Textfield
								placeholder={'Hours'}
								keyboardType="numeric"
								onChangeText={value => {
									this.setState({
										ottHours: parseInt(value, 10),
										ott: true,
										owt: false,
										omt: false
									})
								}}
								style={{
									flex: 1
								}}
								value={this.state.ottHours + ''}
							/>
							<Button
								onPress={this.addCustomDate}
								width={90}
								height={35}
								fontSize={12}
								style={{ padding: 5, alignSelf: 'flex-end' }}
								type="confirm"
								text={'Add Schedule'}
							/>
						</View>
					</View>
					<RadioButton
						style={{ marginLeft: 10, marginBottom: 10 }}
						active={this.state.owt}
						text={'Weekly Tutorial'}
						onPress={() => {
							this.setState({ ott: false, owt: true, omt: false })
						}}
					/>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							marginBottom: 10,
							paddingLeft: 30
						}}>
						<Textfield
							placeholder={'Start Date'}
							datepicker
							callback={({ newDate, newDateString }) =>
								this.setState({
									owtStartDate: newDate,
									owtStartDateString: newDateString,
									ott: false,
									owt: true,
									omt: false
								})
							}
							style={{
								flex: 1
							}}
							value={this.state.owtStartDateString}
						/>
						<Textfield
							placeholder={'End Date'}
							datepicker
							callback={({ newDate, newDateString }) =>
								this.setState({
									owtEndDate: newDate,
									owtEndDateString: newDateString,
									ott: false,
									owt: true,
									omt: false
								})
							}
							style={{
								flex: 1
							}}
							value={this.state.owtEndDateString}
						/>
					</View>
					<Scheduler
						onScheduleChange={schedule =>
							this.setState({
								owtSchedule: schedule,
								ott: false,
								owt: true,
								omt: false
							})
						}
					/>
					<View style={styles.cta}>
						<Button
							style={{ marginLeft: 10, height: 30 }}
							width={55}
							type="cancel"
							text={'Cancel'}
							fontSize={12}
							onPress={this.props.cancelTutorSelection}
						/>
						<Button
							style={{ marginLeft: 10, height: 30 }}
							width={55}
							type="confirm"
							text={'Book'}
							fontSize={12}
							onPress={this.submitData}
						/>
					</View>
				</View>
			</ScrollView>
		)
	}

	_addExistingTutee = index => {
		let { tutees, existingTutees } = this.state
		tutees.push(existingTutees[index])
		this.setState({ tutees, existingTuteeModalVisible: false })
	}

	_addNewTutee = () => {
		let {
			tutees,
			newTuteeFirstname,
			newTuteeLastname,
			newTuteeBirthday,
			newTuteeSchool
		} = this.state
		tutees.push({
			firstname: newTuteeFirstname,
			lastname: newTuteeLastname,
			birthday: newTuteeBirthday,
			school: newTuteeSchool
		})
		this.setState({ tutees, newTuteeModalVisible: false })
	}

	_popTutee = index => {
		let tutees = this.state.tutees
		tutees.pop(index)
		this.setState({ tutees })
	}

	checkConflictSchedules = lprs => {
		let conflicts = []
		// if there are conflicts return false
		if (!!this.state.tutorialSchedules) {
			for (lpr of lprs) {
				for (schedule of this.state.tutorialSchedules) {
					if (
						lpr.timeschedule.start <= schedule.timeschedule.end &&
						lpr.timeschedule.start >= schedule.timeschedule.start
					) {
						conflicts.push(
							new Date(
								schedule.timeschedule.start
							).toLocaleString()
						)
						break
					} else continue
				}
			}
		}
		if (!!conflicts.length) {
			//TODO: schedules list that are conflicts show to client
			Alert.alert(
				'Tutor is already booked by another client on: ' + conflicts[0]
			)
			return true
		}
		//return false if no conflict
		return false
	}

	submitData = async () => {
		const { tutorId } = this.props
		if (!(this.state.tutees.length > 0)) {
			Alert.alert('Please add a tutee.')
			return
		}
		if (!this.state.ott && !this.state.owt && !this.state.omt) {
			Alert.alert('Please select schedule.')
			return
		}
		if (this.state.ott) {
			if (!(this.state.customDates.length > 0)) {
				Alert.alert(
					'You have chosen custom dates. Please input dates to be booked'
				)
				return
			}
			//generate lpr for this appointment
			let generatedLPR = generateLPR('custom', this.state.customDates)
			let appointmentData = {
				tutorId,
				tutees: this.state.tutees,
				address: this.state.address,
				subjects: this.state.subjects,
				centerBased: this.state.centerBased,
				clientId: this.props.loggedInUser.uid,
				schedule: [
					this.state.customDates[0].ottDate,
					this.state.customDates[this.state.customDates.length - 1]
						.ottDate
				],
				serviceType: 0,
				feedbackSubmitted: false
			}

			let conflicted = this.checkConflictSchedules(generatedLPR)
			if (conflicted) {
				return
			}

			try {
				let key = createAppointment(appointmentData)
				for (lpr of generatedLPR) {
					lpr['tutorId'] = appointmentData.tutorId
					lpr['tutees'] = appointmentData.tutees
					lpr['appointmentId'] = key
				}
				createGeneratedLPR(generatedLPR)
			} catch (exception) {
				console.log(exception)
			}
		}
		if (this.state.owt) {
			if (this.state.owtStartDate == null) {
				Alert.alert('Please input start date of weekly tutorial.')
				return
			}
			if (this.state.owtEndDate == null) {
				Alert.alert('Please input end date of weekly tutorial.')
				return
			}
			if (this.state.owtSchedule == null) {
				Alert.alert('Please specify the weekly schedule tutorial.')
				return
			}
			//generate booked schedules
			let bookedSchedules = generateBookedSchedules('weekly', {
				startDate: this.state.owtStartDate,
				endDate: this.state.owtEndDate,
				schedule: this.state.owtSchedule
			})
			//generate lpr for this appointment
			let generatedLPR = generateLPR('weekly', bookedSchedules)
			let appointmentData = {
				tutorId,
				tutees: this.state.tutees,
				address: this.state.address,
				subjects: this.state.subjects,
				centerBased: this.state.centerBased,
				schedule: [
					this.state.owtStartDate.valueOf(),
					this.state.owtEndDate.valueOf()
				],
				clientId: this.props.loggedInUser.uid,
				serviceType: 0,
				feedbackSubmitted: false
			}

			let conflicted = this.checkConflictSchedules(generatedLPR)
			if (conflicted) {
				return
			}

			try {
				let key = createAppointment(appointmentData)
				for (lpr of generatedLPR) {
					lpr['tutorId'] = appointmentData.tutorId
					lpr['tutees'] = appointmentData.tutees
					lpr['appointmentId'] = key
				}
				createGeneratedLPR(generatedLPR)
			} catch (exception) {
				console.log(exception)
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 15
	},
	backButtonContainer: {
		width: deviceWidth,
		height: 25,
		padding: 5
	},
	backButton: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	cta: {
		flex: 1,
		width: '100%',
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	}
})

export default ownprops => {
	return (
		<RootComponentContext.Consumer>
			{props => {
				return <TutorialBooking {...ownprops} {...props} />
			}}
		</RootComponentContext.Consumer>
	)
}
