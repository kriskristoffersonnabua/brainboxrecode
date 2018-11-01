import React from 'react'
import { RootComponentProvider } from './context/RootComponentContext'
import { TutorListProvider } from './context/TutorListContext'
import RootComponent from './RootComponent'

export default () => (
	<RootComponentProvider>
		<TutorListProvider>
			<RootComponent />
		</TutorListProvider>
	</RootComponentProvider>
)
