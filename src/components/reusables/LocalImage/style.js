import glamorous from 'glamorous-native'
import { deviceWidth } from '../../../../lib/device'

export const StyledImage = glamorous.image(props => {
	let width, height
	if (scale) {
		//scale props: originalWidth, originalHeight, widthPadding
		let windowWidth = deviceWidth
		let widthChange =
			(deviceWidth - (props.widthPadding || 0)) / originalWidth
		width = originalWidth * widthChange
		height = originalHeight * widthChange
	} else if (resize) {
		width = newWidth
		height = newHeight
	} else {
		width = originalWidth
		height = originalHeight
	}
	return {
		width,
		height,
		resizeMode: 'contain'
	}
})
