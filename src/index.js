import React from 'react'
import { RootComponentProvider } from './context/RootComponentContext'
import { TutorListProvider } from './context/TutorListContext'
import { AccountSettingsProvider } from './context/AccountSettingsContext'
import RootComponent from './RootComponent'

export default () => (
	<RootComponentProvider>
		<AccountSettingsProvider>
			<TutorListProvider>
				<RootComponent />
			</TutorListProvider>
		</AccountSettingsProvider>
	</RootComponentProvider>
)
