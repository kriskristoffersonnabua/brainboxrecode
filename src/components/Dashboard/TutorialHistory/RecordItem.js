import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { String, Dash } from '../../reusables'

class RecordItem extends Component {
	state = {
		showDetails: false
	}

	toggleDetails = () =>
		this.setState({ showDetails: !this.state.showDetails })

	render() {
		const {
			date,
			duration,
			tutees,
			isTutorPaymentClaimed,
			tutorreport: { time_started, time_ended, remarks, topicsdiscussed }
		} = this.props
		return (
			<View
				style={{
					width: '100%',
					height: 'auto',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<TouchableOpacity
					onPress={this.toggleDetails}
					style={{
						width: '100%',
						height: 'auto',
						alignItems: 'center'
					}}>
					<View
						style={{
							width: '94%',
							height: 'auto',
							padding: 10,
							backgroundColor: Boolean(isTutorPaymentClaimed)
								? 'green'
								: '#fafafa',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<View>
							<String text={'Date: '} bold />
							<String
								text={new Date(date).toLocaleDateString()}
							/>
						</View>
						<View>
							<String text={'Duration: '} bold />
							<Text>{`${time_ended - time_started} hr/s`}</Text>
						</View>
					</View>
					{this.state.showDetails ? (
						<View
							style={{
								width: '94%',
								height: 'auto',
								padding: 10,
								backgroundColor: Boolean(isTutorPaymentClaimed)
									? 'green'
									: '#fafafa',
								alignItems: 'flex-start'
							}}>
							<Dash style={{ marginTop: 0, marginBottom: 10 }} />
							<View style={{ alignItems: 'flex-start' }}>
								<String text={'Tutee: '} bold />
								{tutees.map((tutee, index) => {
									return (
										<String
											key={index}
											text={`${tutee.firstname} ${
												tutee.lastname
											}`}
										/>
									)
								})}
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									width: '100%'
								}}>
								<View
									style={{
										alignSelf: 'flex-end',
										alignItems: 'flex-start'
									}}>
									<String text={'Time Started'} bold />
									<String
										text={new Date(
											new Date(
												new Date().setHours(
													Math.floor(time_started)
												)
											).setMinutes(
												(time_started % 1) * 60
											)
										).toLocaleTimeString()}
									/>
								</View>
								<View
									style={{
										alignSelf: 'flex-end',
										alignItems: 'flex-start'
									}}>
									<String text={'Time Ended'} bold />
									<String
										text={new Date(
											new Date(
												new Date().setHours(
													Math.floor(time_ended)
												)
											).setMinutes((time_ended % 1) * 60)
										).toLocaleTimeString()}
									/>
								</View>
							</View>
						</View>
					) : null}
				</TouchableOpacity>
			</View>
		)
	}
}

export default RecordItem
