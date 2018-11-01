import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { StyledTouchableOpacity, StyledText } from './styles'

export default (ButtonComponent = ({
	style,
	textStyle,
	text,
	...otherProps
}) => {
	return (
		<StyledTouchableOpacity style={style} {...otherProps}>
			<StyledText style={textStyle}>{text}</StyledText>
		</StyledTouchableOpacity>
	)
})
