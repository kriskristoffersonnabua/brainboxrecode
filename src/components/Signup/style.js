import glamorous from 'glamorous-native'
import { deviceWidth, deviceHeight } from '../../../lib/device'

export const SignupContainer = glamorous.view((props, theme) => ({
	flex: 1,
	width: deviceWidth,
	height: deviceHeight,
	justifyContent: 'flex-start',
	alignItems: 'center',
	paddingRigh: 10,
	paddingLeft: 10,
	backgroundColor: theme.colors.white
}))

export const AccountTypeContainer = glamorous.view(props => {
	return {
		width: '100%',
		height: 100,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	}
})

export const AccountTypeChoice = glamorous.view(props => {
	return {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '50%'
	}
})

export const CtaContainer = glamorous.view(props => {
	return {
		width: deviceWidth,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 40,
		paddingRight: 40
	}
})

export const ContainerWithScroll = glamorous.scrollView(props => {
	return {
		width: deviceWidth,
		height: deviceHeight
	}
})
