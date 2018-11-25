import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { deviceWidth } from '../../../lib/device'
import TutorSchedule from './TutorSchedule'
import { String, Subjects, Dash, Button, LocalImage } from '../reusables'

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
				<LocalImage
					resize
					source={
						(!!picture &&
							!!picture.data &&
							!!picture.data.url && {
								uri: picture.data.url
							}) ||
						require('../../../assets/images/avatars/defaultTutorAvatar.png')
					}
					style={{
						borderRadius: 50,
						alignSelf: 'center',
						marginBottom: 10,
						padding: 10
					}}
					newWidth={100}
					newHeight={100}
				/>
				<String
					bold
					style={{ marginBottom: 20 }}
					text={'Personal Information'}
				/>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						paddingLeft: 10,
						paddingRight: 10,
						marginBottom: 10,
						justifyContent: 'space-between'
					}}>
					<String text={'Name:'} bold />
					<String text={first_name + ' ' + last_name} />
				</View>
				<View
					style={{
						width: '100%',
						flexDirection: 'row',
						paddingLeft: 10,
						paddingRight: 10,
						marginBottom: 10,
						justifyContent: 'space-between'
					}}>
					<String text={'Contact:'} bold />
					<String text={contact} />
				</View>
				<View
					style={{
						width: '100%',
						paddingLeft: 10,
						paddingRight: 10,
						marginBottom: 10,
						justifyContent: 'space-between'
					}}>
					<String
						bold
						text={'Address:'}
						style={{ alignSelf: 'flex-start', marginBottom: 10 }}
					/>
					<String text={address} />
				</View>
				{accountType === 1 ? (
					accountEnabled ? null : (
						<String
							text={
								"You're Account Has Not Been Enabled By Admin"
							}
							style={{
								width: 'auto',
								borderRadius: 5,
								padding: 10,
								paddingLeft: 20,
								paddingRight: 20,
								backgroundColor: '#e66464',
								marginTop: 10,
								marginBottom: 10,
								fontSize: 12
							}}
							bold
						/>
					)
				) : null}
				{accountType === 1 ? (
					<Dash style={{ marginBottom: 10, marginTop: 10 }} />
				) : null}
				{accountType === 1 ? (
					<String
						text={'Subjects Handled'}
						bold
						style={{ marginBottom: 10, marginTop: 10 }}
					/>
				) : null}
				{accountType === 1 ? (
					!!subjects.length ? (
						<Subjects
							readOnly
							allSubjectsCallback={() => {}}
							subjects={subjects}
						/>
					) : (
						<View
							style={{
								width: '60%',
								padding: 10,
								backgroundColor: '#bdf287',
								borderRadius: 5,
								alignSelf: 'center',
								marginTop: 10
							}}>
							<String text={'No subjects have been added.'} />
						</View>
					)
				) : null}
				{accountType === 1 ? (
					<Dash style={{ marginBottom: 10, marginTop: 20 }} />
				) : null}
				{accountType === 1 ? (
					<String
						style={{ marginTop: 10, marginBottom: 15 }}
						text={'Available Tutor Schedule'}
						bold
					/>
				) : null}
				{accountType === 1 ? (
					<TutorSchedule readOnly schedule={schedule} />
				) : null}
				<View
					style={{
						width: '100%',
						height: 40,
						marginTop: 10,
						marginBottom: 20,
						padding: 20,
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
					{this.props.viewOnly ? null : (
						<Button
							text={'Edit Information'}
							textStyle={{ fontSize: 12 }}
							onPress={this.toggleEdit}
						/>
					)}
					{this.props.viewOnly ? null : (
						<Button
							type="google"
							textStyle={{ fontSize: 12 }}
							text={'Cancel'}
							onPress={this.props.toggleSettings}
						/>
					)}
				</View>
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
