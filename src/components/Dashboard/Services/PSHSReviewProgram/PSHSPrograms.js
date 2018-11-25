import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet
} from 'react-native'
import { deviceWidth } from '../../../../../lib/device'
import ProgramsListView from '../ProgramsListView'
import { LocalImage, Button } from '../../../reusables'
import ProgramView from '../ProgramView'

class PSHSPrograms extends Component {
	state = {
		selectedProgram: null,
		showForm: false
	}

	back = () => {
		if (!!this.state.selectedProgram) {
			this.setState({ selectedProgram: null })
		} else {
			this.props.back()
		}
	}

	selectProgram = program => {
		this.setState({ selectedProgram: program })
	}

	showBookForm = () => this.setState({ showForm: true })
	unShowBookForm = () => this.setState({ showForm: false })

	render() {
		const { programs } = this.props
		let Component
		if (programs != undefined && !!programs.length) {
			if (!!this.state.selectedProgram) {
				Component = (
					<ProgramView
						showForm={this.state.showForm}
						program={this.state.selectedProgram}
						unShowBookForm={this.unShowBookForm}
					/>
				)
			} else {
				Component = (
					<ProgramsListView
						programs={programs}
						selectProgram={this.selectProgram}
					/>
				)
			}
		} else
			Component = (
				<View
					style={{ width: '80%', alignSelf: 'center', padding: 10 }}>
					<String bold text="No Review Posted" />
				</View>
			)
		return (
			<View style={{ width: deviceWidth, height: 'auto' }}>
				<View style={styles.ctaContainer}>
					<TouchableOpacity
						onPress={this.back}
						style={styles.backButton}>
						<LocalImage
							source={require('../../../../../assets/images/icons/backButton.png')}
							resize
							newWidth={25}
							newHeight={15}
						/>
						<Text>BACK</Text>
					</TouchableOpacity>
					{!!this.state.selectedProgram ? (
						<Button
							type="confirm"
							text={'Book Review'}
							textStyle={{ fontSize: 12 }}
							onPress={this.showBookForm}
							width={120}
							height={30}
						/>
					) : null}
				</View>
				{Component}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	ctaContainer: {
		width: deviceWidth,
		height: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10
	},
	backButton: {
		height: 'auto',
		flexDirection: 'row',
		alignItems: 'center'
	}
})

export default PSHSPrograms
