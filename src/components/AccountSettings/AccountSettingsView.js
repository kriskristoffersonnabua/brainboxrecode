import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { deviceWidth } from '../../../lib/device'
import TutorSchedule from './TutorSchedule'
import { String, Subjects, Dash, Button } from '../reusables'

class AccountSettingsView extends React.Component {
	state = {}

	static getDerivedStateFromProps(nextProps) {
		const {
			profile: {
				email = '',
				first_name = '',
				last_name = '',
				picture = '',
				contact = '',
				address = '',
				subjects = [],
				schedule = false,
				accountType = 0,
				accountEnabled
			} = {}
		} = nextProps
		return {
			email,
			first_name,
			last_name,
			picture,
			contact,
			address,
			subjects,
			schedule,
			accountType,
			accountEnabled
		}
	}

	render() {
		const {
			email,
			first_name,
			last_name,
			picture,
			contact,
			address,
			subjects,
			schedule,
			accountType,
			accountEnabled = false
		} = this.state
		return (
			<ScrollView style={styles.container}>
				<String text={first_name} bold />
				<String text={last_name} bold />
				<String text={contact} bold />
				<String text={address} bold />
				{accountType === 0 ? (
					accountEnabled ? null : (
						<String
							text={
								"You're Account Has Not Been Enabled By Admin"
							}
							bold
						/>
					)
				) : null}
				{accountType === 0 ? <Dash /> : null}
				{accountType === 0 ? (
					<Subjects
						readOnly
						allSubjectsCallback={() => {}}
						subjects={subjects}
					/>
				) : null}
				{accountType === 0 ? <Dash /> : null}
				{accountType === 0 ? (
					<TutorSchedule readOnly schedule={schedule} />
				) : null}
				{this.props.viewOnly ? null : (
					<Button text={'Edit Settings'} onPress={this.toggleEdit} />
				)}
				{this.props.viewOnly ? null : (
					<Button
						type="warning"
						text={'Cancel'}
						onPress={this.props.toggleSettings}
					/>
				)}
			</ScrollView>
		)
	}

	toggleEdit = () => {
		this.props.toggleEditMode()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: 'auto',
		padding: 10
	}
})

export default AccountSettingsView
