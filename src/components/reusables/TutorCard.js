import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LocalImage from './LocalImage'
import { deviceWidth } from '../../../lib/device'

const TutorCard = props => {
	const { tutorInfo: { picture = null, contact } = {} } = props
	return (
		<View elevation={5} style={styles.tutorCardContainer}>
			<TouchableOpacity style={styles.tutorCard} onPress={props.onPress}>
				<LocalImage
					resize
					source={
						(!!picture &&
							!!picture.data &&
							!!picture.data.url && { uri: picture.data.url }) ||
						require('../../../assets/images/avatars/defaultTutorAvatar.png')
					}
					newWidth={65}
					newHeight={65}
					style={{ alignSelf: 'center', borderRadius: 50 }}
				/>
				<View style={styles.tutorCardInformation}>
					<String
						bold
						text={props.tutorName}
						fontSize={{ fontSize: 12 }}
					/>
					<String text={contact} />
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	tutorCardContainer: {
		width: '95%',
		backgroundColor: '#fff',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginBottom: 10
	},
	tutorCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		height: 90,
		backgroundColor: '#fafafa',
		padding: 10
	},
	tutorCardInformation: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 10
	}
})

export default TutorCard
