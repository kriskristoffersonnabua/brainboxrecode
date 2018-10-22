import React from 'react'
import {
	AsyncStorage,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import {
	Button,
	Textfield,
	String,
	RadioButton,
	LocalImage
} from '../reusables'
import { LoginContainer } from './style'
import { User } from '../../firebase'

export default class Login extends React.Component {
	state = {}

	render() {
		return (
			<LoginContainer style={styles.loginContainer}>
				<LocalImage
					scale
					widthPadding={100}
					originalWidth={1734}
					originalHeight={546}
					source={require('../../../assets/images/BrainboxTitle2.jpg')}
					style={{
						marginBottom: 30
					}}
				/>
				<Textfield
					style={{
						width: 300,
						marginBottom: 20
					}}
					placeholder="Email"
					onChangeText={email => this.setState({ email })}
				/>
				<Textfield
					style={{
						width: 300,
						marginBottom: 20
					}}
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					secure
				/>
				<Button
					style={{ height: 40 }}
					textStyle={{ fontSize: 20 }}
					type="confirm"
					text="Login"
					onPress={this.login}
				/>
				<View
					style={{
						width: '100%',
						borderWidth: 1,
						borderColor: '#f0f0f0',
						marginBottom: 30,
						marginTop: 30
					}}
				/>
				<String
					style={{ marginBottom: 20 }}
					bold
					text={'LOGIN WITH:'}
					fontSize={20}
				/>
				<Button
					style={{ height: 40, marginBottom: 10 }}
					textStyle={{ fontSize: 20 }}
					type="facebook"
					text="Facebook"
					onPress={this.loginWithFacebook}
				/>
				<View
					style={{
						width: '100%',
						borderWidth: 1,
						borderColor: '#f0f0f0',
						marginBottom: 30,
						marginTop: 30
					}}
				/>
				<String text={'Do not have an account, go to '} />
				<TouchableOpacity onPress={this.props.goToSignupPage}>
					<String
						style={{
							padding: 10,
							backgroundColor: '#f0f0f0',
							borderRadius: 20,
							marginTop: 10
						}}
						bold
						text={'Signup Page'}
					/>
				</TouchableOpacity>
			</LoginContainer>
		)
	}

	loginWithFacebook = () => {}

	login = () => {}
}

const styles = StyleSheet.create({
	loginContainer: {},
	orStyle: {
		marginTop: 30,
		marginBottom: 30,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	},
	imageStyle: {
		marginTop: 20,
		marginBottom: 50
	},
	textInputStyle: {
		width: 265,
		height: 40
	},
	modal: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fafafa',
		padding: 10
	}
})
