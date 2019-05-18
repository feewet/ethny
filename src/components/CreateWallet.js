import React from 'react'
import { ethers } from 'ethers';
import QR from './QR'

class CreateWallet extends React.Component {

	constructor(props) {
		super(props)
		console.log(this.props)
		this.state = {
			seedphrase: this.props.match.params.seedphrase,
			address: '',
			privateKey: '',
			salt: this.props.match.params.salt,
			qr: ''
		}
	}

	componentDidMount() {
		/*
		this.setState({
			seedphrase: this.props.match.params.seedphrase,
			salt: this.props.match.params.salt
		})*/
		this.generate()
	}

	async generate() {
		await this.generateWallet()
	}

	async generateWallet() {
		let provider = ethers.getDefaultProvider();
		let seedphrase = ethers.utils.hashMessage(this.state.seedphrase)
  	let privateKey = ethers.utils.sha256(seedphrase) // hash
  	let salt = this.state.salt
  	console.log(salt)
    // utils.computePublicKey(publicOrPrivateKey)
    // utils.recoverPublicKey ( digest , signature )
    // utils . soliditySha256 ( types, values )
    let wallet = new ethers.Wallet(privateKey, provider);
    let qr = 'keepkey.io/' + wallet.address + '/' + salt
    this.setState({
    	address: wallet.address,
    	privateKey: privateKey,
    	qr: qr
    })

    return ({
    	address: wallet.address,
    	privateKey: privateKey
    })
	}

	render () {
		return (
			<div className = 'create-wallet'>
				<h1>Genertate Wallet</h1>
				<h3>Seed Phrase: {this.state.seedphrase}</h3>
				<h3>Salt: {this.state.salt} </h3>
				<h3>Wallet Address: {this.state.address}</h3>
				<QR hash={this.state.address} />
				<h3>Wallet Private Key: {this.state.privateKey}</h3>
				<h3>KeepCup QR: {this.state.qr}</h3>
				<QR hash={this.state.qr}/>
			</div>
		)
	}
}

export default CreateWallet;