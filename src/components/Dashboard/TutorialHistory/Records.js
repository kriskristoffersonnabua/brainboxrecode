import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { LoadingPage } from '../../reusables'
import RecordItem from './RecordItem'

class Records extends Component {
	state = {}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	renderItem = props => {
		const { item } = props
		return <RecordItem {...item} />
	}

	keyExtractor = (lpr, index) => {
		return lpr.lprid
	}

	renderSeparator = () => (
		<View
			style={{
				width: '40%',
				height: 10,
				backgroundColor: '#f0f0f0',
				borderRadius: 2
			}}
		/>
	)

	render() {
		const { lprs = [], fetchingData } = this.props
		if (fetchingData) {
			return <LoadingPage text="Fetching submitted reports" />
		}

		return (
			<FlatList
				data={lprs}
				extraData={this.state}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				ItemSeparatorComponent={this.renderSeparator}
			/>
		)
	}
}

export default Records
