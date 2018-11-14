import React from 'react'
import PSHSPrograms from './PSHSPrograms'
import { database } from '../../../../firebase/firebase'
import { forIn } from 'lodash'

export default class PSHSProgramsWithResource extends React.Component {
	state = {
		programs: null
	}

	componentDidMount() {
		database
			.ref('service')
			.orderByChild('serviceType')
			.equalTo(2)
			.on('value', snapshot => {
				const programsobject = snapshot.val()
				let programs = []
				forIn(programsobject, (values, key) => {
					programs.push({ serviceId: key, ...values })
				})
				this.setState({ programs })
			})
	}

	render() {
		return (
			<PSHSPrograms
				back={this.props.back}
				programs={this.state.programs}
			/>
		)
	}
}
