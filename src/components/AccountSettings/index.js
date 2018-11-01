import React from 'react'
import AccountSettingsContext from '../../context/AccountSettingsContext'
import AccountSettingsEdit from './AccountSettingsEdit'
import AccountSettingsView from './AccountSettingsView'
import { database } from '../../firebase/firebase'
import { User } from '../../firebase'
import { LoadingPage } from '../reusables'

class AccountSettingsMain extends React.Component {
	state = {
		editMode: false,
		profile: null,
		fetchingProfile: true
	}

	static getDerivedStateFromProps(nextProps) {
		return nextProps
	}

	render() {
		const { loggedInUser = null } = this.props
		const { fetchingProfile, editMode } = this.state
		const fns = {
			fetchUserProfile: this.fetchUserProfile,
			updateUserProfile: this.updateUserProfile,
			toggleEditMode: this.toggleEditMode
		}

		if (!!!this.state.profile && loggedInUser) {
			this.fetchUserProfile()
		}
		if (fetchingProfile) {
			return <LoadingPage text={'Fetching User Profile'} />
		}
		let component
		if (editMode) {
			return <AccountSettingsEdit {...this.state} {...fns} />
		} else {
			return <AccountSettingsView {...this.state} {...fns} />
		}
	}

	toggleEditMode = () =>
		this.setState(prevState => ({ editMode: !prevState.editMode }))

	fetchUserProfile = () => {
		const { loggedInUser = null } = this.props
		let promise = User.getUserProfile(loggedInUser.uid)
		promise.then(value => {
			setTimeout(() => {
				this.setState({ profile: value, fetchingProfile: false })
			}, 500)
		})
	}

	updateUserProfile = data => {
		User.updateProfile(data)
	}
}

export default ownProps => {
	return (
		<AccountSettingsContext.Consumer>
			{props => {
				return <AccountSettingsMain {...props} {...ownProps} />
			}}
		</AccountSettingsContext.Consumer>
	)
}
