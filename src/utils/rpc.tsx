import ContractAbi from '../page/abi/abi.json'
import { requestRpc } from '../api/blockchain/ftm/request';
import { FromHex, ToHex } from './convertNumber';

export const RpcHelper = {
    gas_price:async () => {
        const bodyParams = {
            method: "eth_gasPrice",
            params: [],
            id: 73
        }

        try {
            const response = await requestRpc(bodyParams)

            if(response.status === 200){
                const value = response.data.result
                return value
            }else{
                const value = '0'
                throw value
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    estimate_gas: async (toAddress: string, Amount: any) => {
        const convertToHex = ToHex(Amount)

        const bodyParams = {
            method: "eth_estimateGas",
            params: [{
                "to": toAddress,
                "data": convertToHex.value
            }],
            id: 1
        }        

        try {
            const response = await requestRpc(bodyParams)
            if(response.status === 200){
                const value = response.data.result
                return value
            }else{
                const value = '0'
                throw value
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}