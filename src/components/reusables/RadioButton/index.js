import React from 'react'
import String from '../String'
import {
	RadioButtonContainer,
	RadioButtonTouchable,
	RadioButtonCircle
} from './style'

export default (Radiobutton = ({
	active,
	onPress,
	style = {},
	innerStyle = {},
	text,
	...otherProps
}) => {
	return (
		<RadioButtonContainer style={style}>
			<RadioButtonTouchable onPress={onPress}>
				<RadioButtonCircle active={active} style={innerStyle} />
			</RadioButtonTouchable>
			<String text={text} />
		</RadioButtonContainer>
	)
})
