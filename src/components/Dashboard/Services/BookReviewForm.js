import React from 'react'
import { Modal, View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { String, Textfield, Button } from '../../reusables'
import RootComponentContext from '../../../context/RootComponentContext'
import { Appointment, Service } from '../../../firebase'

class BookReviewForm extends React.Component {
	state = {
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
		},
		//change this personal data to reviewee on submit form
		firstname: '',
		lastname: '',
		address: '',
		contact: ''
		// payment: [],
	}

	bookReview = () => {
		const {
			firstname,
			lastname,
			address,
			contact,
			...otherState
		} = this.state
		const {
			loggedInUser: { uid },
			program: { slots, serviceId, price = 0 }
		} = this.props
		let appointmentData = {
			clientId: uid,
			reviewee: {
				firstname,
				lastname,
				address,
				contact
			},
			schedule: [
				Number(this.props.program.schedule[0].split(':')[0]),
				Number(
					this.props.program.schedule[
						this.props.program.schedule.length - 1
					].split(':')[0]
				)
			],
			reviewschedule: this.props.program.schedule,
			serviceId,
			serviceType: this.props.program.serviceType,
			price,
			...otherState
		}
		if (slots > 0) {
			let appointmentId = Appointment.createAppointment(appointmentData)
			Service.updateService(appointmentData.serviceId, {
				slots: slots - 1
			})

			//TODO: ADD_PAYMENT
			this.props.unShowBookForm()
			this.setState({
				firstname: '',
				lastname: '',
				address: '',
				contact: ''
			})
		}
	}

	render() {
		const { firstname, lastname, address, contact } = this.state
		return (
			<Modal
				transparent={true}
				onRequestClose={() => {}}
				visible={this.props.showForm}>
				<View style={styles.modalContainer}>
					<View style={styles.modalWrapper}>
						<String
							style={styles.programTitle}
							text={'Civil Service Review'}
						/>
						<View style={styles.programForm}>
							<String text={'Reviewiee Information:'} />
							<Textfield
								onChangeText={text =>
									this.setState({ firstname: text })
								}
								placeholder={'Firstname'}
								value={firstname || ''}
							/>
							<Textfield
								onChangeText={text =>
									this.setState({ lastname: text })
								}
								placeholder={'Lastname'}
								value={lastname || ''}
							/>
							<Textfield
								onChangeText={text =>
									this.setState({ address: text })
								}
								placeholder={'Address'}
								value={address || ''}
							/>
							<Textfield
								onChangeText={text =>
									this.setState({ contact: text })
								}
								placeholder={'Contact'}
								value={contact || ''}
							/>
						</View>
						<View style={styles.programCTAS}>
							<Button
								text={'Cancel'}
								type="cancel"
								width={115}
								height={40}
								onPress={this.props.unShowBookForm}
							/>
							<Button
								onPress={this.bookReview}
								width={115}
								height={40}
								text={'Confirm'}
								type="confirm"
							/>
						</View>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(43,43,43,0.24)'
	},
	modalWrapper: {
		width: 300,
		height: 380,
		backgroundColor: '#fafafa'
	},
	programTitle: {
		width: '100%',
		height: 50,
		backgroundColor: '#E66464',
		padding: 10,
		color: '#fafafa',
		fontSize: 14
	},
	programForm: {
		width: '100%',
		height: 'auto',
		alignItems: 'center',
		padding: 10
	},
	programCTAS: {
		height: 'auto',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	}
})

export default otherProps => {
	return (
		<RootComponentContext.Consumer>
			{props => {
				return <BookReviewForm {...props} {...otherProps} />
			}}
		</RootComponentContext.Consumer>
	)
}
