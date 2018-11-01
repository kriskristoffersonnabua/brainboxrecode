import { Dimensions, LayoutAnimation } from 'react-native'
const windowDimensions = Dimensions.get('window')

var CustomLayoutSpring = {
	duration: 400,
	create: {
		type: LayoutAnimation.Types.spring,
		property: LayoutAnimation.Properties.scaleXY,
		springDamping: 0.7
	},
	update: {
		type: LayoutAnimation.Types.spring,
		springDamping: 0.7
	}
}

module.exports = {
	deviceWidth: windowDimensions.width,
	deviceHeight: windowDimensions.height,
	CustomLayoutSpring
}
