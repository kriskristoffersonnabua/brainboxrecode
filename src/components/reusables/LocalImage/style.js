import glamorous from 'glamorous-native'
import { deviceWidth } from '../../../../lib/device'

export const StyledImage = glamorous.image(props => {
	let width, height
	if (props.scale) {
		//scale props: originalWidth, originalHeight, widthPadding
		let windowWidth = deviceWidth
		let widthChange =
			(deviceWidth - (props.widthPadding || 0)) / props.originalWidth
		width = props.originalWidth * widthChange
		height = props.originalHeight * widthChange
	} else if (props.resize) {
		width = props.newWidth
		height = props.newHeight
	} else {
		width = props.originalWidth
		height = props.originalHeight
	}
	return {
		width,
		height,
		resizeMode: 'contain'
	}
})
