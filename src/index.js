import React from 'react'
import { RootComponentProvider } from './context/RootComponentContext'
import RootComponent from './RootComponent'

export default () => (
	<RootComponentProvider>
		<RootComponent />
	</RootComponentProvider>
)
