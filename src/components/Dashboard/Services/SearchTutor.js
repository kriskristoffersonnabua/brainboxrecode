import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	ScrollView,
	Keyboard
} from 'react-native'
import { deviceWidth } from '../../../../lib/device'
import {
	Dash,
	Textfield,
	Button,
	TutorCard,
	LocalImage,
	LoadingPage
} from '../../reusables'
import TutorListContext from '../../../context/TutorListContext'
import { filter } from 'lodash'
import { User } from '../../../firebase'
import TutorialBooking from './TutorialBooking'
import RootComponentContext from '../../../context/RootComponentContext'
import TutorProfileView from '../../AccountSettings/AccountSettingsView'

class SearchTutor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tutorName: '',
			subject: '',
			timeString: '',
			dateString: '',
			tutorprofile: null,
			tutorId: '',
			loading: false,
			showForm: false
		}
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

	unselectTutor = () => this.setState({ tutorprofile: null, tutorId: null })

	showForm = () => this.setState({ showForm: true })

	unshowForm = () => this.setState({ showForm: false })

	render() {
		const { tutorprofile, tutorId } = this.state

		if (this.state.loading) {
			return <LoadingPage text={'Getting tutor information ...'} />
		}

		return (
			<View style={styles.container}>
				{!!!this.state.showForm ? (
					<View style={styles.backButtonContainer}>
						{!!!this.state.tutorprofile ? (
							<TouchableOpacity
								onPress={this.props.back}
								style={styles.backButton}>
								<LocalImage
									source={require('../../../../assets/images/icons/backButton.png')}
									resize
									newWidth={25}
									newHeight={15}
								/>
								<Text>BACK</Text>
							</TouchableOpacity>
						) : null}
						{!!this.state.tutorprofile ? (
							<TouchableOpacity
								onPress={this.unselectTutor}
								style={styles.backButton}>
								<LocalImage
									source={require('../../../../assets/images/icons/backButton.png')}
									resize
									newWidth={25}
									newHeight={15}
								/>
								<Text>BACK</Text>
							</TouchableOpacity>
						) : null}
						{!!!this.state.showForm && !!this.state.tutorprofile ? (
							<Button
								onPress={this.showForm}
								text={'Book Tutorial'}
								textStyle={{ fontSize: 12 }}
								type="confirm"
							/>
						) : null}
					</View>
				) : null}
				{!!!this.state.tutorprofile ? (
					<Dash style={{ marginTop: 10 }} />
				) : null}
				{!!this.state.showForm ? (
					<RootComponentContext.Consumer>
						{props => {
							return (
								<TutorialBooking
									cancelTutorSelection={this.unshowForm}
									{...props}
									tutorId={this.state.tutorId}
								/>
							)
						}}
					</RootComponentContext.Consumer>
				) : null}
				{!!this.state.tutorprofile ? (
					<Dash style={{ marginTop: 10, marginBottom: 0 }} />
				) : null}
				{!!this.state.tutorprofile && !!!this.state.showForm ? (
					<TutorProfileView
						profile={this.state.tutorprofile}
						viewOnly
					/>
				) : null}
				{!!!this.state.tutorprofile ? (
					<View elevation={2} style={styles.searchSection}>
						<View style={styles.searchFieldHeader}>
							<Text
								style={{
									fontSize: 12,
									fontWeight: 'bold',
									color: '#2b2b2b',
									fontFamily: 'RobotoMono'
								}}>
								Search Available Tutor:
							</Text>
						</View>
						<Dash
							style={{
								width: 310,
								height: 2,
								marginTop: 0,
								marginBottom: 10
							}}
						/>
						<View style={{ flex: 1 }}>
							<Textfield
								style={{ marginBottom: -5, fontSize: 10 }}
								width={290}
								placeholder="Tutor Name"
								onChangeText={value => this.searchTutor(value)}
							/>
						</View>
					</View>
				) : null}
				{!!!this.state.tutorprofile ? <Dash /> : null}
				{!!!this.state.tutorprofile ? (
					<View
						style={{
							paddingRight: 20,
							paddingLeft: 20,
							flex: 1,
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}>
						{this.state.searchedTutors != undefined &&
						this.state.searchedTutors.length > 0 ? (
							<Text
								style={{
									margin: 10
								}}>
								Search Result:
							</Text>
						) : null}
						<ScrollView style={{ width: '100%', paddingTop: 10 }}>
							{(this.state.searchedTutors != null &&
								this.state.searchedTutors.map(
									(tutor, index) => {
										return (
											<TutorCard
												key={tutor.uid}
												tutorName={
													(!!tutor &&
														`${tutor.first_name} ${
															tutor.last_name
														}`) ||
													'tutor'
												}
												tutorInfo={tutor}
												available
												onPress={() =>
													this.fetchUser(tutor.uid)
												}
											/>
										)
									}
								)) ||
								(!!this.props.tutors &&
									this.props.tutors.map((tutor, index) => {
										return (
											<TutorCard
												key={tutor.uid}
												tutorName={
													(!!tutor &&
														`${tutor.first_name} ${
															tutor.last_name
														}`) ||
													'tutor'
												}
												tutorInfo={tutor}
												available
												onPress={() =>
													this.fetchUser(tutor.uid)
												}
											/>
										)
									}))}
						</ScrollView>
					</View>
				) : null}
			</View>
		)
	}

	searchTutor = value => {
		if (!!value.length) {
			let searchedTutors = filter(this.props.tutors, tutor => {
				const { first_name, last_name } = tutor
				return (
					first_name.toLowerCase().includes(value.toLowerCase()) ||
					last_name.toLowerCase().includes(value.toLowerCase())
				)
			})
			this.setState({ searchedTutors })
		} else this.setState({ searchedTutors: null })
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10
	},
	backButtonContainer: {
		width: '100%',
		height: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	backButton: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	searchSection: {
		width: 330,
		height: 120,
		backgroundColor: '#fafafa',
		marginTop: 5,
		borderRadius: 5,
		alignItems: 'center'
	},
	searchFieldHeader: {
		height: 40,
		width: '90%',
		alignItems: 'flex-start',
		padding: 10
	}
})

export default otherProps => {
	return (
		<TutorListContext.Consumer>
			{props => {
				return <SearchTutor {...props} {...otherProps} />
			}}
		</TutorListContext.Consumer>
	)
}
