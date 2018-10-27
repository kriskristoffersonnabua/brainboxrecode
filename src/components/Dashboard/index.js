import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import TutorList from './Tutors'

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
			{ key: 'second', title: 'Tutors' }
		]
	}

	render() {
		return (
			<TabView
				navigationState={this.state}
				renderScene={SceneMap({
					first: FirstRoute,
					second: TutorList
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

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
