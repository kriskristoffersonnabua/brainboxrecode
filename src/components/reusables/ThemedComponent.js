import React from 'react'
import { ThemeProvider } from 'glamorous-native'

const brainboxTheme = {
	fonts: {
		bold: 'RobotoMonoBold',
		italic: 'RobotoMonoItalic',
		regular: 'RobotoMonoRegular',
		header: 20,
		label: 17,
		paragraph: 15
	},
	colors: {
		crusta: '#e9905c',
		mariner: '#4266b2',
		nightrider: '#2b2b2b',
		roman: '#e66464',
		snow: '#fafafa',
		sulu: '#bdf287',
		whitesmoke: '#f0f0f0',
		white: '#ffffff'
	}
}

export default (ThemedComponent = props => (
	<ThemeProvider theme={brainboxTheme}>{props.children}</ThemeProvider>
))
