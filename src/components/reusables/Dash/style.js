import glamorous from 'glamorous-native'

export const DashLine = glamorous.view(
	(props, theme) => ({
		width: '100%',
		borderWidth: 1,
		borderColor: theme.colors.whitesmoke,
		marginBottom: 30,
		marginTop: 30
	}),
	({ style }) => ({ ...style })
)
