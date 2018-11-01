import React from 'react'
import LocalImage from '../LocalImage'
import String from '../String'
import { LoadingPageContainer } from './style'

export default (LoadingPage = props => {
	return (
		<LoadingPageContainer>
			<LocalImage
				scale
				source={require('../../../../assets/images/icons/brainboxlogo.png')}
				widthPadding={50}
				originalWidth={708 / 2}
				originalHeight={708 / 2}
				style={{
					marginBottom: 10
				}}
			/>
			{!!props.text ? <String text={props.text} bold /> : null}
		</LoadingPageContainer>
	)
})
