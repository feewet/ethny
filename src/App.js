import React from 'react'
import ethers from 'ethers'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import CreateWallet from './components/CreateWallet'
import WalletModule from './components/WalletModule'

export default function App () {

  return (
    // <WalletModule pin= '2345' seedphrase="listentothesongofthebufficornincolorado"/>
    <div>
      <Route path = '/create/:seedphrase/:salt' component = {CreateWallet} />
      <Route exact path='/:address/:salt' component = {WalletModule} />
    </div>
  )
}