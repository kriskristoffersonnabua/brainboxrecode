import React, { Component } from 'react'
import { StyledImage } from './style'

export default (LocalImage = ({ source, style, ...otherProps }) => {
	return <StyledImage source={source} style={style} {...otherProps} />
})
