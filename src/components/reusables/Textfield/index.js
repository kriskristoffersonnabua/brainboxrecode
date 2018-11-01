import React from 'react'
import { DatePickerAndroid, Keyboard, TimePickerAndroid } from 'react-native'
import { StyledTextInput } from './style'

export default (TextField = ({
	datepicker,
	timepicker,
	callback = () => {},
	style = {},
	format24Hour,
	secure,
	...otherProps
}) => {
	let datetimeOptions = {}
	if (datepicker) {
		datetimeOptions = {
			onFocus: async evt => {
				Keyboard.dismiss()
				const {
					action,
					year,
					month,
					day
				} = await DatePickerAndroid.open({
					date: new Date()
				})
				if (action != DatePickerAndroid.dismissedAction) {
					const newDate = new Date(year, month, day)

					const data = newDate.toString().split(' ')
					const newDateString = `${data[1]} ${data[2]}, ${data[3]}`
					callback({ newDate: newDate.valueOf(), newDateString })
				}
			}
		}
	} else if (timepicker) {
		datetimeOptions = {
			onFocus: async evt => {
				Keyboard.dismiss()
				const { action, hour, minute } = await TimePickerAndroid.open({
					hour: 10,
					minute: 0,
					is24Hour: false
				})
				if (action != TimePickerAndroid.dismissedAction) {
					const newTime = hour + minute / 60
					let newTimeString
					if (format24Hour) {
						newTimeString = `${hour}:${
							minute < 10 ? `0${minute}` : minute
						}`
					} else {
						newTimeString =
							hour < 12
								? `${hour}:${
										minute > 9 ? minute : '0' + minute
								  } a.m`
								: `${hour - 12}:${
										minute > 9 ? minute : '0' + minute
								  } p.m`
					}
					callback({ newTime, newTimeString })
				}
			}
		}
	}
	return (
		<StyledTextInput
			style={style}
			secureTextEntry={secure || false}
			{...otherProps}
			{...datetimeOptions}
		/>
	)
})
