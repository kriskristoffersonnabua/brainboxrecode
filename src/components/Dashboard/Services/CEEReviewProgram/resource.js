import React from 'react'
import CEEPrograms from './CEEPrograms'
import { database } from '../../../../firebase/firebase'
import { forIn } from 'lodash'
import { LoadingPage } from '../../../reusables'

export default class CEEProgramsWithResource extends React.Component {
	state = {
		programs: null
	}

	componentDidMount() {
		this.setState({ loading: true })
		database
			.ref('service')
			.orderByChild('serviceType')
			.equalTo(3)
			.on('value', snapshot => {
				const programsobject = snapshot.val()
				let programs = []
				forIn(programsobject, (values, key) => {
					programs.push({ serviceId: key, ...values })
				})
				this.setState({ programs, loading: false })
			})
	}

	render() {
		if (!!this.state.loading) {
			return <LoadingPage text="Fetching List of Reviews" />
		}

		return (
			<CEEPrograms
				back={this.props.back}
				programs={this.state.programs}
			/>
		)
	}
}
