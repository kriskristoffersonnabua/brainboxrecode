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
import { Dash, Textfield, Button, TutorCard, LocalImage } from '../../reusables'
import TutorListContext from '../../../context/TutorListContext'
import { filter } from 'lodash'

class SearchTutor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tutorName: '',
			subject: '',
			timeString: '',
			dateString: ''
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.backButtonContainer}>
					<TouchableOpacity
						onPress={this.props.back}
						style={styles.backButton}>
						<LocalImage
							source={require('../../../../assets/images/icons/backButton.png')}
							resize
							newWidth={15}
							newHeight={15}
						/>
						<Text>BACK</Text>
					</TouchableOpacity>
				</View>
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
							Results:
						</Text>
					) : null}
					<ScrollView style={{ width: '100%', paddingTop: 10 }}>
						{(this.state.searchedTutors != null &&
							this.state.searchedTutors.map((tutor, index) => {
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
										available
										onPress={() =>
											this.props.setTutorId(tutor.uid)
										}
									/>
								)
							})) ||
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
											available
											onPress={() =>
												this.props.setTutorId(tutor.uid)
											}
										/>
									)
								}))}
					</ScrollView>
				</View>
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
		height: 25
	},
	backButton: {
		flexDirection: 'row',
		width: 60,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	searchSection: {
		width: 330,
		height: 185,
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
