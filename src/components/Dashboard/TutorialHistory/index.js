import React from 'react'
import ResourceContext from './resource'
import Records from './Records'

export default (History = () => {
	return (
		<ResourceContext.Consumer>
			{props => {
				return <Records {...props} />
			}}
		</ResourceContext.Consumer>
	)
})
