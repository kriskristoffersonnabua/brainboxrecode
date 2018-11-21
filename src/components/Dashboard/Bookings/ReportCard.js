import React from 'react'
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, String, Textfield } from '../../reusables'
import { database } from '../../../firebase/firebase'

class ReportCard extends React.Component {
	state = {
		showForm: false
	}

	toggleForm = () =>
		this.setState({
			showForm: !this.state.showForm
		})

	submitReport = () => {
		const {
			topicsdiscussed,
			time_started,
			time_ended,
			remarks
		} = this.state

		database
			.ref('lpr')
			.child(this.props.lpr.lprid)
			.update({
				tutorialCompleted: true,
				tutorreport: {
					topicsdiscussed,
					time_started,
					time_ended,
					remarks
				}
			})
	}

	promptUser = () => {
		const {
			topicsdiscussed,
			time_started,
			time_ended,
			remarks
		} = this.state

		//prevent tutor from adding reports to future schedule
		if (Date.now() < this.props.lpr.timeschedule.start) {
			Alert.alert("You can't add report for future schduele.")
			return
		}

		if (
			!Boolean(topicsdiscussed) ||
			!Boolean(time_started) ||
			!Boolean(time_ended) ||
			!Boolean(remarks)
		) {
			Alert.alert('You must not leave a blank.')
			return
		}

		Alert.alert(
			'Save Report?',
			'You are about to complete this tutorial.',
			[
				{ text: 'Cancel', onPress: () => {} },
				{ text: 'Submit', onPress: this.submitReport }
			]
		)
	}

	render() {
		const { lpr } = this.props
		const { showForm } = this.state
		if (!!lpr.tutorialCompleted) {
			const {
				topicsdiscussed,
				time_started,
				time_ended,
				remarks
			} = lpr.tutorreport
			let duration = time_ended - time_started
			return (
				<View
					style={{
						width: '100%',
						padding: 10,
						borderWidth: 1,
						borderColor: '#2b2b2b',
						marginBottom: 10
					}}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}>
						<String bold text={'Date: '} />
						<String
							italic
							text={
								!!lpr.date &&
								new Date(lpr.date).toLocaleDateString()
							}
						/>
					</View>
					<View
						style={{
							justifyContent: 'flex-start',
							alignItems: 'flex-start'
						}}>
						<String bold text={'Topics Discussed: '} />
						<String italic text={topicsdiscussed} />
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}>
						<String bold text={'Hours: '} />
						<String
							italic
							text={!!duration && `${duration} hour/s`}
						/>
					</View>
					<View
						style={{
							alignItems: 'flex-start'
						}}>
						<String bold text={'Remarks:'} />
						<String italic text={!!remarks && remarks} />
					</View>
				</View>
			)
		} else
			return (
				<View
					style={{
						width: '100%',
						padding: 10,
						borderWidth: 1,
						borderColor: '#2b2b2b',
						marginBottom: 10
					}}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}>
							<String bold text={'Date: '} />
							<String
								italic
								text={
									!!lpr.date
										? new Date(
												lpr.date
										  ).toLocaleDateString()
										: ''
								}
							/>
						</View>
						<String bold text={'NO REPORT SUBMITTED'} />
					</View>
					<View
						style={{
							padding: 20,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						{!showForm ? (
							<TouchableOpacity onPress={this.toggleForm}>
								<String bold text={'TAP TO ADD REPORT'} />
							</TouchableOpacity>
						) : (
							<View
								style={{
									width: '100%',
									padding: 10,
									alignItems: 'flex-start'
								}}>
								<Textfield
									placeholder={'Topics Discussed'}
									onChangeText={text =>
										this.setState({ topicsdiscussed: text })
									}
									value={this.state.topicsdiscussed}
								/>
								<Textfield
									timepicker
									placeholder={'Time Start'}
									callback={({ newTime, newTimeString }) =>
										this.setState({
											time_started: newTime,
											time_started_string: newTimeString
										})
									}
									value={this.state.time_started_string}
								/>
								<Textfield
									timepicker
									placeholder={'Time End'}
									callback={({ newTime, newTimeString }) =>
										this.setState({
											time_ended: newTime,
											time_ended_string: newTimeString
										})
									}
									value={this.state.time_ended_string}
								/>
								<Textfield
									placeholder={'Remarks'}
									value={this.state.remarks}
									onChangeText={text =>
										this.setState({ remarks: text })
									}
								/>
								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-around',
										alignItems: 'center'
									}}>
									<Button
										type="warning"
										text={'Cancel'}
										width={100}
										onPress={this.toggleForm}
									/>
									<Button
										type="confirm"
										text={'Submit'}
										width={100}
										onPress={this.promptUser}
									/>
								</View>
							</View>
						)}
					</View>
				</View>
			)
	}
}

export default ReportCard
