import React from 'react'
import { RootComponentProvider } from './context/RootComponentContext'
import { TutorListProvider } from './context/TutorListContext'
import { AccountSettingsProvider } from './context/AccountSettingsContext'
import { BookingsProvider } from './context/Bookings'
import RootComponent from './RootComponent'

export default () => (
	<RootComponentProvider>
		<BookingsProvider>
			<AccountSettingsProvider>
				<TutorListProvider>
					<RootComponent />
				</TutorListProvider>
			</AccountSettingsProvider>
		</BookingsProvider>
	</RootComponentProvider>
)
