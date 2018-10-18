import React from 'react'
import LocalImage from '../LocalImage'
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
			/>
		</LoadingPageContainer>
	)
})
