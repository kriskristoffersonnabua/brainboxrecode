import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Textfield, String, Button, Dash } from '../reusables'
import { deviceWidth } from '../../../lib/device'

const HeaderButton = ({ text }) => (
	<TouchableOpacity>
		<String text={text} bold />
	</TouchableOpacity>
)

class Schedule extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View
				style={{
					width: 'auto',
					height: 'auto',
					padding: 10,
					backgroundColor: '#fff',
					alignItems: 'center',
					justifyContent: 'flex-start',
					borderColor: '#2b2b2b',
					borderWidth: 1
				}}>
				<View
					style={{
						width: '100%',
						height: 'auto',
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}>
					<View
						style={{
							width: '100%',
							height: 20,
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<HeaderButton text={'Mon'} />
						<HeaderButton text={'Tue'} />
						<HeaderButton text={'Wed'} />
						<HeaderButton text={'Thu'} />
						<HeaderButton text={'Fri'} />
						<HeaderButton text={'Sat'} />
						<HeaderButton text={'Sun'} />
					</View>
					<Dash
						style={{
							marginBottom: 10,
							marginTop: 10
						}}
					/>
					<View
						style={{
							width: '100%',
							height: 'auto',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}>
						<Textfield
							timepicker
							placeholder={'start time'}
							style={{ width: 150 }}
						/>
						<Textfield
							timepicker
							placeholder={'end time'}
							style={{ width: 150 }}
						/>
					</View>
					<Dash
						style={{
							marginBottom: 10,
							marginTop: 10
						}}
					/>
					<Button text={'add schedule'} />
				</View>
			</View>
		)
	}
}

export default Schedule
