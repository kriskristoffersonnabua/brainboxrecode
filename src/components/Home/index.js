import React from 'react'
import { Header } from '../reusables'
import { HomeContainer } from './style'
import Dashboard from '../Dashboard'

class Home extends React.Component {
	state = {}
	render() {
		return (
			<HomeContainer>
				<Header />
				<Dashboard />
			</HomeContainer>
		)
	}
}

export default Home
