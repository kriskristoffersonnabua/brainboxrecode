import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import ServicesList from './ServicesList'
import SearchTutor from './SearchTutor'
import TutorialBooking from './TutorialBooking'
import CSCReviewProgram from './CSCReviewProgram'
import PSHSReviewProgram from './PSHSReviewProgram'
import CEEReviewProgram from './CEEReviewProgram'
import { Service, AccountType } from '../../../../lib/constants'
import RootComponentContext from '../../../context/RootComponentContext'

export default class Main extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: null
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps
		})
	}

	render() {
		let component
		switch (this.state.selected) {
			case Service.OneOnOneTutorial:
				component = <SearchTutor back={this.back} />
				break
			case Service.CSCExamReview:
				component = <CSCReviewProgram back={this.back} />
				break
			case Service.PSHSExamReview:
				component = <PSHSReviewProgram back={this.back} />
				break
			case Service.CEExamReview:
				component = <CEEReviewProgram back={this.back} />
				break
			default:
				component = (
					<ServicesList callback={i => this.selectService(i)} />
				)
				break
		}
		return <View style={styles.container}>{component}</View>
	}

	back = () => this.setState({ selected: null })

	selectService = selected => {
		switch (selected) {
			case Service.OneOnOneTutorial:
				break
			case Service.CSCExamReview:
				break
			case Service.PSHSExamReview:
				break
			case Service.CEExamReview:
				break
		}
		this.setState({ selected })
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
})
