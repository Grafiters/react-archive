import React, { useState } from 'react';
import '../../style/section.css';
import '../../style/form.css';
import '../../style/box.css';

import { ButtonStyle } from '../../component/button';
import { requestRpc } from '../../api/blockchain/ftm/request';
import { FromHex } from '../../utils'
import ContractAbi from '../abi/abi.json'
import Web3 from 'web3';
import SendTransaction from './send_transaction';
import { Routes, Route, BrowserRouter as Router, Link, Outlet } from 'react-router-dom';
const ContractAddress = '0x23318730bf3F2B54eACA75b81BD3648f613F0774'
const Address = "0xf49aEaC0a0dA433DEf38c0922d9D08D210D2393d"

const web3 = new Web3()

interface AbiInput {
    name: string;
    type: string;
  }
  
  interface AbiOutput {
    name: string;
    type: string;
  }
  
  interface AbiFunction {
    type: 'function';
    inputs?: AbiInput[];
    outputs?: AbiOutput[];
    name?: string;
    stateMutability?: StateMutabilityType;
  }
  
  type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';
  
  // Example ABI item for balanceOf function
  const balanceOfFunctions: AbiFunction = {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ]
  };
  

const Blockchain: React.FC = () => {
    const [isCoin, setIsCoin] = useState(true)
    const [apiResponse, setApiResponse] = useState<{result: any} | null>(null);
    const [balanceOf, setBalanceOf] = useState<AbiFunction>(balanceOfFunctions);

    const parsingData = (data: any) => {
        const convert = FromHex(data.result)

        setApiResponse({result: convert?.value})
    }

    const FetchData = {
        coin: async () => {
            const bodyParams = {
                method: "eth_getBalance",
                params: [Address, "latest"],
                id: 1
            }
            
            try {
                const response = await requestRpc(bodyParams);
                
                if(response.data.hasOwnProperty('result')){
                    setIsCoin(true)
                    parsingData(response.data)
                } else {
                    setApiResponse({result: response.data.error})
                }
    
            } catch (error) {
                console.log(error);
            }
        },
        token: async () => {
            const balanceOfFunction = ContractAbi.find((item: any) => item.name === 'balanceOf' && item.type === 'function');

            if (!balanceOfFunction) {
                console.error('balanceOf function not found in ABI.');
                return;
            }

            {
                setBalanceOf(balanceOfFunction => ({
                  ...balanceOfFunction,
                  ['stateMutability']: undefined,
                }));
            }
        
            console.log(balanceOf);
            
            const functionSignature = web3.eth.abi.encodeFunctionCall(balanceOf, [Address]);

            const bodyParams = {
                method: "eth_call",
                params: [{
                    "to": ContractAddress,
                    "data": functionSignature
                }, "latest"],
                id: 1
            }
            
            try {
                const response = await requestRpc(bodyParams);
                
                if(response.data.hasOwnProperty('result')){
                    setIsCoin(false)
                    parsingData(response.data)
                } else {
                    setApiResponse({result: response.data.error})
                }
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <div className="section">
            <div className='box_container'>
                    <div className='box-title'>Check Balance Coin</div>
                    
                    <div>
                        <button style={ButtonStyle.button_info()} onClick={FetchData.coin}>Check</button>
                        {apiResponse?.hasOwnProperty('result') && isCoin && (
                            <div>
                                <h2>Fetched Data Balance Coin:</h2>
                                <pre>{JSON.stringify(apiResponse?.result, null, 2)}</pre>
                            </div>
                        )}
                    </div>
            </div>

            <div className='box_container'>
                    <div className='box-title'>Check Balance Token</div>
                    
                    <div>
                        <button style={ButtonStyle.button_info()} onClick={FetchData.token}>Check</button>
                        {apiResponse?.hasOwnProperty('result') && !isCoin && (
                            <div>
                                <h2>Fetched Data Balance Coin:</h2>
                                <pre>{JSON.stringify(apiResponse?.result, null, 2)}</pre>
                            </div>
                        )}
                    </div>
            </div>
            </div>
        </div>
    );
}

export default Blockchain;