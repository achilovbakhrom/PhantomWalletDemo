import { exchange, blockexplorer, pushtx } from 'blockchain.info';
import bitcoin from 'react-native-bitcoinjs-lib';
import axios from 'axios';
import Constants from './constants';
import { Exception } from 'handlebars';

const c_exchange = exchange;
const c_blockexplorer = blockexplorer.usingNetwork(3);
const c_pushtx = pushtx.usingNetwork(3).pushtx;
const c_network = bitcoin.networks.bitcoin;

const getPrice = currency => c_exchange.getTicker({ currency: currency || 'USD' });

const getFee = () => {
    return axios.get(Constants.Endpoints.BitcoinFees).then((response) => {
        return (response.data.fastestFee * Constants.Transactions.AverageBytes) / Constants.Bitcoin.Satoshis;
    }).catch(() => {
        return 0;
    });
};

const broadcast = (tx) => {    
    const data = new FormData();
    data.append('tx', tx);
    return axios.post('https://blockchain.info/pushtx', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}


const getUnspentOutputs = (address) => {
    return c_blockexplorer.getUnspentOutputs(address).then((result) => {
        return {
            utxos: result.unspent_outputs,
            coins: result.unspent_outputs.reduce((a, c) => a + c.value, 0) / Constants.Bitcoin.Satoshis
        };
    });
};

const getBalance = async (addresses) => {
    let adr = ''
    if (addresses instanceof Array) {
        adr = addresses.join('|')
    } else {
        adr = addresses
    }
    let url = 'https://blockchain.info/balance?active=' + addresses;
    const response = await axios.post(url)
    let balance = 0
    if (response.status == 200) {
        const data = response.data;
        balance = data[addresses].final_balance;
    }     
    return balance;
}

const getTransactions = async (addresses) => {
    let resAddr;
    if (addresses instanceof Array) {
        resAddr = addresses.join('|');
    } else {
        resAddr = addresses;
    }
    
    const url = 'https://blockchain.info/multiaddr?active=' + resAddr;
    const res = await axios.get(url);
    return res;
};

export default {
    current: c_network,
    name: 'testnet',
    api: {
        getPrice: getPrice,
        getFee: getFee,
        broadcast: broadcast,
        getUnspentOutputs: getUnspentOutputs,
        getTransactions: getTransactions,
        getBalance: getBalance

    }
};