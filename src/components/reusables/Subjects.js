import React, { Component } from 'react'
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
	LayoutAnimation
} from 'react-native'
import Textfield from './Textfield'
import Button from './Button'
import String from './String'
import ModalDropdown from 'react-native-modal-dropdown'
import { CustomLayoutSpring } from '../../../lib/device'

const colors = ['#E66464', '#F4BDDB', '#97E6F0', '#BDF287', '#E9905C']
const Subject = props => {
	let backgroundColor = colors[props.random]
	return (
		<TouchableOpacity
			{...props}
			style={{
				backgroundColor,
				padding: 5,
				borderRadius: 5,
				margin: 5
			}}>
			<String style={{ color: '#fafafa' }} text={props.subject} />
		</TouchableOpacity>
	)
}

class Subjects extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subjects: [],
			availableSubjects: [
				'College Algebra 1',
				'Chemistry 3',
				'Physics 2',
				'Science and Health 1',
				'Geometry 3'
			]
		}
	}

	static getDerivedStateFromProps(nextProps) {
		const { subjects } = nextProps
		return { subjects }
		this.setState({ subjects })
	}

	render() {
		return (
			<View style={styles.container}>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						marginBottom: 5
					}}>
					{this.state.subjects &&
						!!this.state.subjects.length &&
						this.state.subjects.map((subject, index) => {
							return (
								<Subject
									onPress={
										this.props.readOnly
											? () => {}
											: e => this._popSubject(index)
									}
									key={index}
									index={index}
									subject={`${subject}${
										this.props.readOnly ? '' : '  x'
									}`}
									random={index % (colors.length - 1)}
								/>
							)
						})}
				</View>
				{!this.props.readOnly ? (
					<View
						style={{
							width: '100%',
							paddingLeft: 10,
							paddingRight: 10,
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}>
						<Textfield
							placeholder={'Subject'}
							style={{ width: '50%', marginRight: 10 }}
							onChangeText={text =>
								this.setState({ subjectToAdd: text })
							}
							value={this.state.subjectToAdd}
						/>
						<Button
							text={'Add Subject'}
							style={{ width: '30%' }}
							onPress={this.addSubject}
						/>
					</View>
				) : null}
			</View>
		)
	}

	_popSubject = index => {
		let subjects = this.state.subjects
		subjects.splice(index, 1)
		if (subjects === undefined) {
			subjects = []
		}
		this.setState({ subjects }, () => {
			!!this.props.allSubjectsCallback &&
				this.props.allSubjectsCallback(subjects)
		})
	}

	addSubject = () => {
		const { subjectToAdd, subjects } = this.state
		let newsubjects = subjects
		newsubjects.push(subjectToAdd)
		this.setState(
			{
				subjects: newsubjects,
				subjectToAdd: ''
			},
			() => {
				!!this.props.allSubjectsCallback &&
					this.props.allSubjectsCallback(newsubjects)
			}
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 'auto',
		marginBottom: 10
	}
})

export default Subjects
