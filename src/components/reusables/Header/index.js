import React from 'react'
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	ScrollView,
	Text,
	TouchableOpacity,
	LayoutAnimation
} from 'react-native'
import LocalImage from '../LocalImage'
import String from '../String'
import { deviceWidth, CustomLayoutSpring } from '../../../../lib/device'

const MenuItem = props => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			elevatation={2}
			style={{
				width: deviceWidth,
				height: 30,
				paddingTop: 20,
				paddingBottom: 20,
				backgroundColor: '#fff',
				shadowOpacity: 1,
				alignItems: 'center',
				justifyContent: 'center',
				margin: 1,
				padding: 5
			}}>
			<String bold text={props.text} />
		</TouchableOpacity>
	)
}

export default class Header extends React.Component {
	state = {
		openMenu: false
	}
	render() {
		const { openMenu } = this.state
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-start',
					backgroundColor: '#fafafa'
				}}>
				<View style={styles.headerBar}>
					<TouchableOpacity onPress={() => this._toggleMenu()}>
						<LocalImage
							source={require('../../../../assets/images/avatars/defaultTutorAvatar.png')}
							originalWidth={57}
							originalHeight={61}
						/>
					</TouchableOpacity>
					<LocalImage
						source={require('../../../../assets/images/bboxTitlePage.png')}
						originalWidth={160}
						originalHeight={50}
					/>
				</View>
				{openMenu ? (
					<View>
						<MenuItem text={'account settings'} />
						<MenuItem text={'log out'} />
					</View>
				) : null}
				<View style={{ flex: 1, backgroundColor: 'blue' }} />
			</View>
		)
	}
	_toggleMenu = () => {
		LayoutAnimation.configureNext(CustomLayoutSpring)
		this.setState({ openMenu: !this.state.openMenu })
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		maxHeight: 150
	},
	headerBar: {
		padding: 5,
		width: deviceWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})
