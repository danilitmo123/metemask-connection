import {useWeb3React} from "@web3-react/core";
import {injected} from "../utils";
import {useEffect, useState} from "react";


export const useConnect = () => {
  const {account, activate, deactivate} = useWeb3React();
  const [ethereum, setEthereum] = useState();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setEthereum(window.ethereum);
  }, [])

  const connect = async () => {
    if (ethereum) {
      try {
        await activate(injected);
        setError(false);
      } catch (e) {
        console.log(e)
      }
    } else {
      setError(true);
      console.log('MetaMask not detected')
    }
  }

  const disconnect = async () => {
    try {
      await deactivate()
    } catch (e) {
      console.log(e)
    }
  }

  return {connect, disconnect, account, error}
}