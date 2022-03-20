import type { NextPage } from 'next'
import { useConnect } from "../hooks/useConnect";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import styled from 'styled-components'

const WalletConnectWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: black;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0070f3;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  width: 240px;
  margin-bottom: 20px;
`;

const TextField = styled.span`
  color: #fff;
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: #ff0000ff;
  opacity: .7;
  margin-bottom: 20px;
`;

const Home: NextPage = () => {
  const { connect, disconnect, account, error } = useConnect();
  const [balance, setBalance] = useState<string>();
  const { library, active } = useWeb3React();

  useEffect(() => {
    library && library.eth.getBalance(account).then((balance) => {
      setBalance(balance)
    })
  }, [account])

  return (
    <WalletConnectWrapper>
      <Button onClick={connect}>Connect MetaMask</Button>
      {error && <Error>MetaMask not detected, please install it</Error>}
      <TextField>Your account: {account ? account : 'No Account'}</TextField>
      <TextField>Your balance: {balance && active ? balance : 'No balance'} BNB</TextField>
      <Button onClick={disconnect} disabled={!account}>Disconnect MetaMask</Button>
    </WalletConnectWrapper>
  )
}

export default Home
