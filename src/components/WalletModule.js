import React from 'react'
import { ethers } from 'ethers';
import QR from './QR'

class WalletModule extends React.Component {

	constructor(props) {
		super(props)
		console.log(this.props)
		this.state = {
			seedphrase: '',
			address: '',
			privateKey: '',
			burnerAddress: '',
			burnerPrivateKey: '',
			burnerPin: '',
			salt: ''
		}

		this.generateBurnerWallet.bind(this)
	}

	componentDidMount() {
		this.setState({
			address: this.props.match.params.address,
			salt: this.props.match.params.salt
		})
		this.generate()
	}

	async generate() {
		await this.generateBurnerWallet(this.state.burnerPin)
	}

	async generateBurnerWallet(pin) {
		let seedphrase = ethers.utils.hashMessage(this.state.address + this.state.salt + pin)
    let privateKey = ethers.utils.sha256(seedphrase) // hash
    let provider = ethers.getDefaultProvider();
    let wallet = new ethers.Wallet(privateKey, provider);
    this.setState({
    	burnerAddress: wallet.address,
    	burnerPrivateKey: privateKey,
    	burnerPin: pin
    })

    return (
    	{
    	burnerAddress: wallet,
    	burnerPrivateKey: privateKey,
    	burnerPin: pin
    }
    )
	}

	setBurnerPin(pin) {
		this.setState({
			burnerPin: pin
		})
	}

	render () {
		return (
			<div className = 'create-wallet'>
				<h1>KeepCup Wallet</h1>
				<h3>Wallet Address: {this.state.address}</h3>
				<QR hash={this.state.address} />
				<h3>Wallet Private Key: {this.state.privateKey}</h3>
				<h3>Burner Address: {this.state.burnerAddress}</h3>
				<QR hash={this.state.burnerAddress} />
				<h3>Burner Private Key: {this.state.burnerPrivateKey}</h3>
				<h3>Burner Pin: {this.state.burnerPin}</h3>
			</div>
		)
	}
}

export default WalletModule;