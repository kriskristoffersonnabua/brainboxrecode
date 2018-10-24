import glm from 'glamorous-native'
import { deviceWidth, deviceHeight } from '../../../lib/device'

export const HomeContainer = glm.view((props, theme) => ({
	width: deviceWidth,
	height: deviceHeight,
	backgroundColor: '#f0f0f0'
}))
