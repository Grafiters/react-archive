import React, { useState } from 'react';
import '../../style/section.css';
import '../../style/form.css';
import '../../style/box.css';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import Form from '../../component/form'

import { ButtonStyle } from '../../component/button';
import { requestRpc } from '../../api/blockchain/ftm/request';
import { FromHex, RpcHelper, ToHex } from '../../utils'
import ContractAbi from '../abi/abi.json'
import { ethers } from 'ethers';
import { parse } from 'path';


const ContractAddress = '0x23318730bf3F2B54eACA75b81BD3648f613F0774'
const Address = "0xf49aEaC0a0dA433DEf38c0922d9D08D210D2393d"

const web3 = new Web3()

const SendTransaction: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputAmount, setInputAmount] = useState('');
    const [contractAddress, setContractAddress] = useState('');
    const [gasPrice, setGasPrice] = useState<any>();
    const [gasLimit, setGasLimit] = useState<any>();
    
    const handleInpute = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleAmount = (e: any) => {
        setInputAmount(e.target.value)
    }

    const handleButtonInput = () => {
        generateGasPrice()
        generateGasLimit()

        const parseAmount = new BigNumber(inputAmount.toString())
        const convertValueAmount = ToHex(parseAmount.toString())
        setInputAmount(convertValueAmount.toString())
        
        console.log(inputAmount);
        
    }

    const generateGasPrice = async () => {
        const value = await RpcHelper.gas_price();
        setGasPrice(value)
    }

    const generateGasLimit = async () => {        
        const value = await RpcHelper.estimate_gas(Address, 10.50)
        setGasLimit(value)
    }

    // const FetchData = {
    //     coin: async () => {
            
    //     },
    //     token: async () => {
            
    //     }
    // }

    return (
        <div>
            <div className="section">
                <div className='box_container'>
                    <div className='box-title'>Send Coin</div>
                    <input
                        type="text"
                        placeholder="Address"
                        value={inputValue}
                        onChange={handleInpute}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={inputAmount}
                        onChange={handleAmount}
                    />
                    <button style={ButtonStyle.button_info()} onClick={handleButtonInput}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default SendTransaction;