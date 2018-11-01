import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { deviceWidth } from '../../../lib/device'
import TutorSchedule from './TutorSchedule'
import { Subjects, Dash, Textfield, Button } from '../reusables'
import { assign } from 'lodash'

class AccountSettingsEdit extends Component {
	state = {}

	static getDerivedStateFromProps(nextProps, prevState) {
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
				accountType = 0
			} = {}
		} = nextProps
		let returnProps = {}
		if (!!nextProps.profile) {
			assign(returnProps, {
				first_name:
					prevState.first_name === undefined
						? first_name
						: prevState.first_name,
				last_name:
					prevState.last_name === undefined
						? last_name
						: prevState.last_name,
				picture:
					prevState.picture === undefined
						? picture
						: prevState.picture,
				email: prevState.email === undefined ? email : prevState.email,
				contact:
					prevState.contact === undefined
						? contact
						: prevState.contact,
				address:
					prevState.address === undefined
						? address
						: prevState.address,
				subjects:
					prevState.subjects === undefined
						? subjects
						: prevState.subjects,
				schedule:
					prevState.schedule === undefined
						? schedule
						: prevState.schedule,
				accountType
			})
		}
		return returnProps
	}

	render() {
		const {
			first_name = 'first name',
			last_name = 'last name',
			contact = 'contact',
			address = 'address',
			accountType = 1,
			subjects = [],
			schedule
		} = this.state
		return (
			<ScrollView style={styles.container}>
				<Textfield
					style={{ width: '100%' }}
					placeholder={'First Name'}
					defaultValue={first_name}
					onChangeText={text => this.setState({ first_name: text })}
				/>
				<Textfield
					style={{ width: '100%' }}
					placeholder={'Last Name'}
					defaultValue={last_name}
					onChangeText={text => this.setState({ last_name: text })}
				/>
				<Textfield
					style={{ width: '100%' }}
					placeholder={'Contact'}
					defaultValue={contact}
					onChangeText={text => this.setState({ contact: text })}
				/>
				<Textfield
					style={{ width: '100%' }}
					placeholder={'Address'}
					defaultValue={address}
					onChangeText={text => this.setState({ address: text })}
				/>
				{accountType === 0 ? <Dash /> : null}
				{accountType === 0 ? (
					<Subjects
						allSubjectsCallback={this.setSubjects}
						subjects={subjects}
					/>
				) : null}
				{accountType === 0 ? <Dash /> : null}
				{accountType === 0 ? (
					<TutorSchedule
						allTutorSchedule={schedule =>
							this.setState({ schedule })
						}
						schedule={schedule}
					/>
				) : null}
				<Button text={'Save'} onPress={this.saveProfile} />
			</ScrollView>
		)
	}

	setSubjects = subjects => this.setState({ subjects })

	saveProfile = () => {
		const { loggedInUser: { uid } } = this.props
		let toUpdate = { uid, ...this.state }
		this.props.updateUserProfile(toUpdate)
		this.props.toggleEditMode()
		this.props.fetchUserProfile()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: deviceWidth,
		height: 200,
		padding: 10
	}
})

export default AccountSettingsEdit
