import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AccountType, Services } from '../../../../lib/constants'
import { String, LocalImage } from '../../reusables'

const BookedCard = props => {
	const { appointment, setIdSelected } = props
	console.log(props)

	let bookedservice = Services[appointment.serviceType]
	let schedule
	if (!!appointment.schedule) {
		if (appointment.schedule.length > 1) {
			schedule = `${new Date(
				appointment.schedule[0]
			).toLocaleDateString()} - ${new Date(
				appointment.schedule[appointment.schedule.length - 1]
			).toLocaleDateString()}`
		} else schedule = new Date(appointment.schedule[0]).toLocaleDateString()
	}

	return (
		<View elevation={2} style={styles.bookedContainer}>
			<TouchableOpacity style={styles.bookedCard} onPress={setIdSelected}>
				<View style={styles.bookedCardInformation}>
					<String text={bookedservice} fontSize={14} bold />
					<String text={schedule} fontSize={12} />
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	bookedContainer: {
		backgroundColor: '#fff',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 10,
		padding: 10,
		width: '90%'
	},
	bookedCard: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 90,
		padding: 10
	},
	bookedCardInformation: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default BookedCard
