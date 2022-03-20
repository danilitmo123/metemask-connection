import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3 from 'web3';
import {useWeb3React, Web3ReactProvider} from '@web3-react/core'
import {useEffect, useState} from "react";
import {injected} from "../utils";

function getLibrary(provider: any) {
  return new Web3('https://bsc-dataseed1.binance.org:443')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
