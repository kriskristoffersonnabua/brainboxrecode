import React, { Component } from 'react'
import {
	Button as NativeButton,
	View,
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
import { deviceWidth } from '../../../lib/device'
import TutorSchedule from './TutorSchedule'
import { Subjects, Dash, Textfield, Button, String } from '../reusables'
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
				<String
					text={'Personal Information'}
					bold
					style={{ marginBottom: 10, marginTop: 10 }}
				/>
				<Textfield
					style={{ width: '100%', marginBottom: 10 }}
					placeholder={'First Name'}
					defaultValue={first_name}
					onChangeText={text => this.setState({ first_name: text })}
				/>
				<Textfield
					style={{ width: '100%', marginBottom: 10 }}
					placeholder={'Last Name'}
					defaultValue={last_name}
					onChangeText={text => this.setState({ last_name: text })}
				/>
				<Textfield
					style={{ width: '100%', marginBottom: 10 }}
					placeholder={'Contact'}
					defaultValue={contact}
					onChangeText={text => this.setState({ contact: text })}
				/>
				<Textfield
					style={{ width: '100%', marginBottom: 10 }}
					placeholder={'Address'}
					defaultValue={address}
					onChangeText={text => this.setState({ address: text })}
				/>
				{accountType === 1 ? (
					<Dash style={{ marginTop: 10, marginBottom: 10 }} />
				) : null}
				<String
					text={'Subjects Handled'}
					bold
					style={{ margin: 10, marginBottom: 20 }}
				/>
				{accountType === 1 ? (
					<Subjects
						allSubjectsCallback={this.setSubjects}
						subjects={subjects}
					/>
				) : null}
				{accountType === 1 ? (
					<Dash style={{ marginBottom: 10, marginTop: 10 }} />
				) : null}
				<String
					text={'Tutor Schedule'}
					bold
					style={{ marginBottom: 10, marginTop: 10 }}
				/>
				{accountType === 1 ? (
					<TutorSchedule
						allTutorSchedule={schedule =>
							this.setState({ schedule })
						}
						schedule={schedule}
					/>
				) : null}
				<View
					style={{
						width: '100%',
						height: 40,
						marginTop: 10,
						marginBottom: 50,
						padding: 20,
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					<Button text={'Save'} onPress={this.saveProfile} />
					<Button
						type="warning"
						text={'Cancel'}
						onPress={this.props.toggleEditMode}
					/>
				</View>
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
		padding: 10,
		paddingBottom: 100
	}
})

export default AccountSettingsEdit
