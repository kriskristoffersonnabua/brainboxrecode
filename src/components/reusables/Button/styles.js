import glamorous from 'glamorous-native'

export const StyledTouchableOpacity = glamorous.touchableOpacity(
	props => ({
		width: props.width || 150,
		height: props.height || 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25
	}),
	(props, theme) => {
		let backgroundColor
		switch (props.type) {
			case 'confirm':
				backgroundColor = theme.colors.sulu
				break
			case 'cancel':
				backgroundColor = theme.colors.roman
				break
			case 'warning':
				backgroundColor = theme.colors.crusta
				break
			case 'facebook':
				backgroundColor = theme.colors.mariner
				break
			case 'google':
				backgroundColor = theme.colors.roman
				break
			default:
				backgroundColor = theme.colors.sulu
		}
		return { backgroundColor }
	},
	props => {
		let customStyles = !!props.style ? { ...props.style } : null
		return customStyles
	}
)

export const StyledText = glamorous.text(
	(props, theme) => {
		return {
			fontFamily: theme.fonts.regular,
			fontSize: theme.fonts.label,
			textAlign: 'center',
			color: theme.colors.snow
		}
	},
	props => {
		let customStyles = !!props.style ? { ...props.style } : null
		return customStyles
	}
)
