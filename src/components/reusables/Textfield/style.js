import glamorous from 'glamorous-native'

export const StyledTextInput = glamorous.textInput((props, theme) => {
	return {
		width: props.width || 200,
		height: props.height || 40,
		backgroundColor: theme.colors.whitesmoke,
		paddingLeft: 20,
		fontSize: props.fontSize || theme.fonts.paragraph,
		fontFamily: theme.fonts.regular,
		...props.style
	}
})
