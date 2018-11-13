import React from 'react'
import {
	View,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Text
} from 'react-native'
import { deviceWidth, deviceHeight } from '../../../../lib/device'
import { Button, String, LocalImage, Dash } from '../../reusables'
import { Services } from '../../../../lib/constants'
import BookReviewForm from './BookReviewForm'
import { programSchedule } from '../../../../lib/converter'

const Schedule = props => {
	let morningSchedule = null,
		afternoonSchedule = null
	if (!!props.schedule) {
		let schedule = programSchedule(props.schedule)
		let parsedDate = new Date(schedule.date).toString().split(' ')

		if (!!schedule.morningDuration) {
			let date, time, duration
			duration = `${schedule.morningDuration} hour/s`
			date = `${parsedDate[1]} ${parsedDate[2]} ${parsedDate[3]} (${
				parsedDate[0]
			})`
			if ((schedule.morningTime % 1) * 60 < 10) {
				time = `${Math.floor(
					schedule.morningTime
				)}:0${(schedule.morningTime % 1) * 60}`
			} else
				time = `${Math.floor(
					schedule.morningTime
				)}:${(schedule.morningTime % 1) * 60}`
			morningSchedule = (
				<View
					elevation={2}
					style={{
						width: '100%',
						height: 40,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: 5,
						paddingLeft: 10,
						paddingRight: 10,
						paddingTop: 5,
						paddingBottom: 5,
						backgroundColor: '#BDF287',
						marginTop: 5,
						marginBottom: 5
					}}>
					<String text={date} />
					<String text={time} />
					<String text={duration} />
				</View>
			)
		}
		if (!!schedule.afternoonDuration) {
			let date, time, duration
			duration = `${schedule.afternoonDuration} hour/s`
			date = `${parsedDate[1]} ${parsedDate[2]} ${parsedDate[3]} (${
				parsedDate[0]
			})`
			if ((schedule.afternoonTime % 1) * 60 < 10) {
				time = `${Math.floor(
					schedule.afternoonTime
				)}:0${(schedule.afternoonTime % 1) * 60}`
			} else
				time = `${Math.floor(
					schedule.afternoonTime
				)}:${(schedule.afternoonTime % 1) * 60}`
			afternoonSchedule = (
				<View
					elevation={2}
					style={{
						width: '100%',
						height: 40,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: 5,
						paddingLeft: 10,
						paddingRight: 10,
						paddingTop: 5,
						paddingBottom: 5,
						backgroundColor: '#BDF287',
						marginTop: 5,
						marginBottom: 5
					}}>
					<String text={date} />
					<String text={time} />
					<String text={duration} />
				</View>
			)
		}
	}
	return (
		<React.Fragment>
			{morningSchedule}
			{afternoonSchedule}
		</React.Fragment>
	)
}

const ProgramView = props => {
	return (
		<View style={styles.programViewContainer}>
			<BookReviewForm
				showForm={props.showForm}
				unShowBookForm={props.unShowBookForm}
				program={props.program}
			/>
			<View style={styles.programBody}>
				<String
					bold
					style={styles.programTitle}
					text={Services[props.program.serviceType]}
				/>
				<Dash style={{ marginTop: 15, marginBottom: 15 }} />
				<String
					style={styles.programDescription}
					text={props.program.serviceDescription}
				/>
				<Dash style={{ marginTop: 15, marginBottom: 15 }} />
				<String bold style={styles.scheduleTitle} text={'Schedule:'} />
				<ScrollView style={styles.scheduleScroll}>
					<View style={styles.scheduleBody}>
						{!!props.program &&
							!!props.program.schedule &&
							props.program.schedule.map((schedule, index) => {
								return (
									<Schedule schedule={schedule} key={index} />
								)
							})}
					</View>
				</ScrollView>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	programViewContainer: {
		width: deviceWidth,
		height: deviceHeight,
		height: 'auto',
		backgroundColor: 'white'
	},
	backButton: {},
	ctaContainer: {
		width: '100%',
		height: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5
	},
	programBody: {
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: deviceWidth
	},
	programTitle: {
		fontSize: 16
	},
	programDescription: {
		fontSize: 14
	},
	scheduleTitle: {
		fontSize: 14,
		alignSelf: 'flex-start',
		marginBottom: 15
	},
	scheduleScroll: {
		width: '100%',
		height: 200
	},
	scheduleBody: {
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

export default ProgramView
