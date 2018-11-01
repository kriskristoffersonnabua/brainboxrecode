import glamorous from 'glamorous-native'

export const StyledText = glamorous.text(
	(props, theme) => {
		let fontFamily = theme.fonts.regular
		let fontSize = theme.fonts.paragraph
		if (props.bold) fontFamily = theme.fonts.bold
		if (props.italic) fontFamily = theme.fonts.italic
		if (props.label) fontSize = theme.fonts.label
		if (props.header) fontSize = theme.fonts.header
		return {
			fontFamily,
			fontSize,
			textAlign: 'center',
			color: theme.colors.nightrider
		}
	},
	({ style }) => ({ ...style })
)
