import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
	Button,
	Textfield,
	LocalImage,
	String,
	RadioButton
} from '../reusables'
import { AccountType } from '../../../lib/constants'
import {
	ContainerWithScroll,
	SignupContainer,
	AccountTypeContainer,
	AccountTypeChoice,
	CtaContainer
} from './style'
import * as _ from 'lodash'
import { User } from '../../firebase'

export default class Signup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			accountType: AccountType.Client,
			accountMessage: "I'm a Client/Tutee.",
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			contact: '',
			month: 0,
			day: 1,
			year: 1993,
			birthday: new Date(),
			birthdayToString: ''
		}
	}

	render() {
		return (
			<ContainerWithScroll>
				<SignupContainer>
					<LocalImage
						scale
						widthPadding={100}
						originalWidth={1734}
						originalHeight={546}
						source={require('../../../assets/images/BrainboxTitle2.jpg')}
					/>
					<AccountTypeContainer>
						<String
							bold
							style={{
								fontSize: 15,
								marginBottom: 10
							}}
							text={'I am signing up as...'}
						/>
						<AccountTypeChoice>
							<RadioButton
								onPress={this.changeAccountTypeToTutor}
								active={this.state.accountType === 1}
								text={'Tutor'}
							/>
							<RadioButton
								onPress={this.changeAccountTypeToClient}
								active={this.state.accountType === 0}
								text={'Client'}
							/>
						</AccountTypeChoice>
					</AccountTypeContainer>
					<Textfield
						placeholder="Email"
						onChangeText={email => this.setState({ email })}
						value={this.state.email}
						style={{ width: 300, marginBottom: 10 }}
						keyboardType="email-address"
					/>
					<Textfield
						placeholder="Password"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
						style={{ width: 300, marginBottom: 10 }}
						secure
					/>
					<Textfield
						placeholder="Firstname"
						onChangeText={first_name => this.setState({ first_name })}
						value={this.state.first_name}
						style={{ width: 300, marginBottom: 10 }}
					/>
					<Textfield
						placeholder="Lastname"
						onChangeText={last_name => this.setState({ last_name })}
						value={this.state.last_name}
						style={{ width: 300, marginBottom: 10 }}
					/>
					<Textfield
						placeholder="Contact/Mobile Number"
						onChangeText={contact => this.setState({ contact })}
						value={this.state.contact}
						style={{ width: 300, marginBottom: 10 }}
					/>
					<Textfield
						placeholder="Birthday"
						datepicker
						callback={({ newDateString, newDate }) =>
							this.setState({
								birthday: newDate,
								birthdayToString: newDateString
							})
						}
						value={this.state.birthdayToString}
						style={{ width: 300, marginBottom: 10 }}
					/>
					<String
						bold
						text={
							'By signing up you agree to the terms and conditions of brainbox'
						}
						style={{
							marginBottom: 10
						}}
					/>
					<CtaContainer>
						<Button
							type="confirm"
							text="Signup"
							onPress={this.submitData}
							style={{
								height: 40
							}}
						/>
						<TouchableOpacity onPress={this.props.toggleSignupLoginPage}>
							<String
								style={{
									borderRadius: 20,
									color: '#2b2b2b',
									height: 30,
									width: 150,
									textAlign: 'center'
								}}
								bold
								fontSize={6}
								text={'to Login Page'}
							/>
						</TouchableOpacity>
					</CtaContainer>
				</SignupContainer>
			</ContainerWithScroll>
		)
	}

	changeAccountTypeToTutor = () => this.setState({ accountType: 0 })
	changeAccountTypeToClient = () => this.setState({ accountType: 1 })

	submitData = event => {
		const {
			email,
			password,
			first_name,
			last_name,
			contact,
			birthday,
			accountType
		} = this.state
		User.signupUser({
			email,
			password,
			first_name,
			last_name,
			contact,
			birthday,
			accountType
		})
	}
}
