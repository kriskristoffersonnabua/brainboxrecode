import React from 'react'
import { Header } from '../reusables'
import { HomeContainer } from './style'
import Dashboard from '../Dashboard'
import { User } from '../../firebase'

class Home extends React.Component {
	state = {}
	render() {
		return (
			<HomeContainer>
				<Header signOut={User.signoutUser} />
				<Dashboard />
			</HomeContainer>
		)
	}
}

export default Home
