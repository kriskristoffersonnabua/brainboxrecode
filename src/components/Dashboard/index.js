import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import TutorList from './Tutors'
import Bookings from './Bookings'
import Services from './Services'
import TutorialRecords from './TutorialHistory'
import { LoadingPage } from '../reusables'

const FirstRoute = () => (
	<View style={[styles.container, { backgroundColor: '#ff4081' }]} />
)
const SecondRoute = () => (
	<View style={[styles.container, { backgroundColor: '#673ab7' }]} />
)

export default class TabViewExample extends React.Component {
	state = {
		index: 0,
		routes: [
			{ key: 'first', title: 'Services' },
			{ key: 'second', title: 'Tutors' },
			{ key: 'third', title: 'My Bookings' }
		]
	}

	render() {
		const { userprofile } = this.props
		const BookingInstance = Bookings

		if (!!!userprofile) return <LoadingPage text="loading some stuff..." />

		if (userprofile.accountType === 0) {
			return (
				<TabView
					navigationState={{
						index: this.state.index,
						routes: [
							{ key: 'first', title: 'Services' },
							{ key: 'second', title: 'Tutors' },
							{ key: 'third', title: 'My Bookings' }
						]
					}}
					renderScene={SceneMap({
						first: Services,
						second: TutorList,
						third: BookingInstance
					})}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{
						height: 0,
						width: Dimensions.get('window').width
					}}
				/>
			)
		} else {
			return (
				<TabView
					navigationState={{
						index: this.state.index,
						routes: [
							{ key: 'first', title: 'Tutors' },
							{ key: 'second', title: 'My Bookings' },
							{
								key: 'third',
								title: 'Records'
							}
						]
					}}
					renderScene={SceneMap({
						first: TutorList,
						second: BookingInstance,
						third: TutorialRecords
					})}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{
						height: 0,
						width: Dimensions.get('window').width
					}}
				/>
			)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
