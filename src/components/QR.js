import React from 'react'

import QRCode from 'qrcode.react'

class QR extends React.Component {
	constructor(props) {
		super(props)
	}

	generateQR() {

	}

	render () {
		return (
				<QRCode value = {this.props.hash} size={256} renderAs='canvas'/>
		)
	}
}

export default QR;