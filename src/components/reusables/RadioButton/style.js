import glamorous from 'glamorous-native'

export const RadioButtonContainer = glamorous.view(
	(props, theme) => {
		return {
			flex: 1,
			width: props.width || '100%',
			flexDirection: 'row',
			alignItems: 'center'
		}
	},
	props => ({ ...props.style })
)

export const RadioButtonTouchable = glamorous.touchableOpacity(props => ({
	width: 18,
	height: 18,
	justifyContent: 'center',
	alignItems: 'center',
	borderWidth: 1,
	borderRadius: 30,
	marginRight: 10
}))

export const RadioButtonCircle = glamorous.view(
	(props, theme) => {
		let color = props.active ? theme.colors.sulu : theme.colors.snow
		return {
			width: 10,
			height: 10,
			borderRadius: 30,
			backgroundColor: color
		}
	},
	props => ({ ...props.style })
)
