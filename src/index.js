import React from 'react'
import { RootComponentProvider } from './context/RootComponentContext'
import { TutorListProvider } from './context/TutorListContext'
import { AccountSettingsProvider } from './context/AccountSettingsContext'
import { BookingsProvider } from './context/Bookings'
import { RecordsProvider } from './components/Dashboard/TutorialHistory/resource'
import RootComponent from './RootComponent'

export default () => (
	<RootComponentProvider>
		<BookingsProvider>
			<AccountSettingsProvider>
				<TutorListProvider>
					<RecordsProvider>
						<RootComponent />
					</RecordsProvider>
				</TutorListProvider>
			</AccountSettingsProvider>
		</BookingsProvider>
	</RootComponentProvider>
)
