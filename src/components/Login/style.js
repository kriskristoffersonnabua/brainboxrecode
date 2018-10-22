import glamorous from 'glamorous-native'
import { deviceWidth, deviceHeight } from '../../../lib/device'

export const LoginContainer = glamorous.view((props, theme) => ({
	flex: 1,
	flexDirection: 'column',
	width: deviceWidth,
	justifyContent: 'flex-start',
	paddingTop: 50,
	paddingLeft: 30,
	paddingRight: 30,
	alignItems: 'center',
	backgroundColor: theme.colors.white
}))
