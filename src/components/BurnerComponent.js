import React from 'react'
import QRCode from 'qrcode.react'

class BurnerComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	render () {
		if (isGenerated) { return null }
		return (
				<div onClick = {this.props.createBurner}> </button>
		)
	}
}

export default BurnerComponent;