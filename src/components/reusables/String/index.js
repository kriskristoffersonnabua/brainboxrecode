import React from 'react'
import { StyledText } from './style'

export default (String = props => {
	const { style, text, ...otherProps } = props
	return (
		<StyledText style={style} {...otherProps}>
			{text}
		</StyledText>
	)
})
