import React    from "react"; 

import { useState } from 'react';

const SignIn = (props) => {

  const [isConnecting, setIsConnecting] = useState(false);

  const detectProvider = () => {

    let provider;

    if (window.ethereum) {
      provider = window.ethereum;
    }
    else if (window.web3) {
      provider = window.web3.currentProvider;
    } 
    else {
      window.alert('No Ethereum Browser/MetaMask detected');
    } 

    return provider;

  }

  const onSignInHandler = async() => {

    const provider = detectProvider();

    if (provider) {

      if (provider !== window.ethereum) {
        console.error('Not window.ethereum provider');
      }

      setIsConnecting(true);

      await provider.request({
        method: 'eth_requestAccounts'
      });
  
      setIsConnecting(false);
  
    } 
    props.onSignIn(provider);

  }
  
  return (
    <div>

      <button onClick={onSignInHandler} type="button">

        {!isConnecting && "Connect to MetaMask account"}
        {isConnecting && "Login to MetaMask"}

      </button>

    </div>
  );

}

export default SignIn;
