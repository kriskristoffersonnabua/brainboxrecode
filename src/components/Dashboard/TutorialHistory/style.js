import g from 'glamorous'
import { deviceWidth, deviceHeight } from '../../../../lib/device'

export const RecordsContainer = g.view(
	(props, theme) => ({
		height: deviceHeight,
		width: deviceWidth
	}),
	({ style }) => ({ ...style })
)
