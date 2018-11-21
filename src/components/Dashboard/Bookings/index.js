import React, { Component } from 'react'
import {
	Alert,
	ScrollView,
	View,
	StyleSheet,
	Text,
	AsyncStorage
} from 'react-native'
import BookingsContext from '../../../context/Bookings'
import { database } from '../../../firebase/firebase'
import { assign, forIn } from 'lodash'
import BookedReview from './BookedReview'
import BookedTutorial from './BookedTutorial'
import BookedCard from './BookedCard'
import { AccountType, Services } from '../../../../lib/constants'
import { programSchedule } from '../../../../lib/converter'
import { LoadingPage } from '../../reusables'

class Main extends Component {
	constructor(props) {
		super(props)

		this.state = {
			appointmentSelected: false,
			appointmentLPR: false,
			programType: -1,
			loading: false
		}

		this.dataController = null
		this.lprController = null
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	unselectAppointment = () => {
		this.lprController = null
		this.setState({ appointmentSelected: false, appointmentLPR: false })
	}

	componentDidUpdate() {
		if (!!this.props.loggedInUser && !!this.props.userprofile) {
			if (!!!this.dataController) {
				if (this.props.userprofile.accountType === AccountType.Client)
					this.dataController = database
						.ref()
						.child('appointment')
						.orderByChild('clientId')
						.equalTo(this.props.loggedInUser.uid)
						.on('value', snapshot => {
							let appointments = []
							forIn(snapshot.val(), (values, key) => {
								appointments.push({
									...values,
									appointmentId: key
								})
							})
							this.setState({ appointments })
						})
				else
					this.dataController = database
						.ref()
						.child('appointment')
						.orderByChild('tutorId')
						.equalTo(this.props.loggedInUser.uid)
						.on('value', snapshot => {
							let appointments = []
							forIn(snapshot.val(), (values, key) => {
								appointments.push({
									...values,
									appointmentId: key
								})
							})
							this.setState({ appointments })
						})
			}
		}
	}

	componentWillUnmount() {
		this.dataController = null
	}

	fetchLPRAndTutorProfile = async (appointmentId, tutorId) => {
		this.setState({ loading: true })
		let tutorprofile = await database
			.ref('userprofile')
			.child(tutorId)
			.once('value')
			.then(snapshot => snapshot.val())
		this.lprController = database
			.ref('lpr')
			.orderByChild('appointmentId')
			.equalTo(appointmentId)
			.on('value', snapshot => {
				let lprs = snapshot.val()
				appointmentLPR = []
				forIn(lprs, (values, key) => {
					appointmentLPR.push({ ...values, lprid: key })
				})
				setTimeout(() => {
					this.setState({
						appointmentLPR,
						loading: false,
						tutorprofile
					})
				}, 500)
			})
	}

	selectAppointment = appointment => {
		this.setState({
			appointmentSelected: appointment
		})
		if (appointment.serviceType === 0) {
			this.fetchLPRAndTutorProfile(
				appointment.appointmentId,
				appointment.tutorId
			)
		}
	}

	render() {
		const {
			appointments,
			loading,
			appointmentSelected,
			appointmentLPR,
			tutorprofile = {}
		} = this.state
		let component

		console.log(this.props)
		if (loading) {
			return <LoadingPage text={'Fetching schedule'} />
		}

		if (!!appointmentSelected) {
			if (appointmentSelected.serviceType === 0) {
				component = (
					<BookedTutorial
						selectedAppointment={appointmentSelected}
						lpr={appointmentLPR}
						clearSelect={this.unselectAppointment}
						userprofile={this.props.userprofile}
						tutorprofile={tutorprofile}
					/>
				)
			} else {
				component = (
					<BookedReview
						reviewName={Services[appointmentSelected.serviceType]}
						selectedAppointment={appointmentSelected}
						clearSelect={this.unselectAppointment}
					/>
				)
			}
		} else {
			if (!!appointments) {
				component = appointments.map(appointment => {
					return (
						<BookedCard
							key={appointment.appointmentId}
							appointment={appointment}
							setIdSelected={() =>
								this.selectAppointment(appointment)
							}
						/>
					)
				})
			} else component = <Text>List of Booked Tutorial/Reviews</Text>
		}

		return <ScrollView style={styles.container}>{component}</ScrollView>
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 10,
		backgroundColor: '#fff'
	}
})

export default ownprops => {
	return (
		<BookingsContext.Consumer>
			{props => {
				return <Main {...props} {...ownprops} />
			}}
		</BookingsContext.Consumer>
	)
}
