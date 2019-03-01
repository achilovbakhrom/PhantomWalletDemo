import bip39 from 'react-native-bip39';
import bitcoin from 'react-native-bitcoinjs-lib';
import EventEmitter from 'events';
import bnet from './network';
import { bitcoinDb } from '../../utils/database';
import Hasher from '../../utils/hashUtils';
import Wallet from  '../../domains/wallet';
import {getXPub} from '../../utils/walletUtils';
import Constants from './constants';
// 'project nasty dose grunt ritual price gap prison degree agent satisfy across'

class BitcoinWallet extends EventEmitter {

    constructor(info) {        
        this.__name = info.name;
        this.__address == info.address;
        this.__password = info.password || undefined;
        this.__utxos = [];        
    }

    set utxos(value) {
        this.__utxos = value;
    }

    get utxos() {
        return this.__utxos;
    }

    async save() {
        const wallet = new Wallet({
            name: name,
            address: address,
            password: password,
            network: bnet.name,
            seed: Hasher.encrypt(seed, password)
        });
        const w = await bitcoinDb.insert(wallet);        
        return w;
    }    
    
}

export const getTransactionsList = async (xpub) => {           
    
    const zeroIndexAddresses = await generateAddressListForIndex(0, 0, xpub);
    const firstIndexAddresses = await generateAddressListForIndex(0, 1, xpub);
    const responseZero = await bnet.api.getTransactions(zeroIndexAddresses);
    const responseFirst = await bnet.api.getTransactions(firstIndexAddresses);
    
    const zeroTx = responseZero.data.txs;
    const firstTx = responseFirst.data.txs;

    const result = [];

    zeroTx.forEach(element => {
        const inputs = element.inputs.map(input => {
            let out = input.prev_out
            return {
                index: out.n,
                tx_index: out.tx_index,
                address: out.addr,
                spent: out.spent,
                value: out.value,
                type: out.type,
            }
        })
        const outputs = element.out.map(out => {
            return {
                index: out.n,
                tx_index: out.tx_index,
                address: out.addr,
                spent: out.spent,
                value: out.value,
                type: out.type,
            }
        })
        result.push({
            hash: element.hash,
            fee: element.fee | 0,
            balance: element.balance,
            inputs: inputs,
            outputs: outputs,
            result: element.result
        })    
    });
    
    firstTx.forEach(element => {
        const inputs = element.inputs.map(input => {
            let out = input.prev_out
            return {
                index: out.n,
                tx_index: out.tx_index,
                address: out.addr,
                spent: out.spent,
                value: out.value,
                type: out.type,
            }
        })
        const outputs = element.out.map(out => {
            return {
                index: out.n,
                tx_index: out.tx_index,
                address: out.addr,
                spent: out.spent,
                value: out.value,
                type: out.type,
            }
        })
        result.push({
            hash: element.hash,
            fee: element.fee | 0,
            balance: element.balance,
            inputs: inputs,
            outputs: outputs,
            result: element.result
        })   
    })

    return result
}

export const getBalanceForMnemonics = async (mnemonics) => {
    const xpub = getXPub(mnemonics, bnet.current, BitcoinWallet.Defaults.Path);          
    const balance =  await bnet.api.getBalance(xpub)        
    return balance/Constants.Bitcoin.Satoshis;
}

const generateAddressListForIndex = (from, derivedPathIndex, xpub) => {        
    const master = bitcoin.HDNode.fromBase58(xpub);
    let index = from;
    return new Promise( (res) => {
        const addresses = [];
        while(true) {
            const derived = master.derive(derivedPathIndex).derive(index);
            addresses.push(derived.getAddress())
            if (index === from + 99) {
                res(addresses)
                break
            }
            index++
        }
    })
}


// export const sendTransaction = () => {
//     bnet.api.getFee().then((fee) => {
//         console.log("fee="+fee);
//         const satoshis = Math.round(fee * Constants.Bitcoin.Satoshis);
//         let key = bitcoin.ECPair.fromWIF("L47iPTNUuNLPoHWKc42yaqE4fXag4Yi86KMvcbyb7TLJRm6ESSzD", bitcoin.networks.bitcoin);        
//         let tx = new bitcoin.TransactionBuilder();
//         tx.addInput("6584d44d8c205f3a33a5093fbb53f501a5a087344d6416b81e5ac74007bd22d1", 0);
//         tx.addOutput("17CrdRH4mWgCKwKJKYPU4CZrT89YfFEH2n", satoshis); // 1000 satoshis will be taken as fee.
//         tx.addOutput("16z46CESbJTEAFZdvm47w1rqzu4F7HQc8", Math.round(150000 - satoshis)); // 1000 satoshis will be taken as fee.
//         tx.sign(0, key);
//         console.log("before");
//         let raw = tx.build().toHex();
//         console.log(raw);
//         console.log("after");
//         bnet.api.broadcast(raw);
//     }).catch((e) => {
//         console.log('Could not get fee ', e);
//     });
// }

export const sendTransaction = async () => {
    const fee = await bnet.api.getFee();
    console.log("fee="+fee);
    const satoshis = Math.round(Constants.Bitcoin.Satoshis);
    let key = bitcoin.ECPair.fromWIF("KxxNPsd91jyk62A4ZEBVXvcMGcpdvPU7JfKXjdUBxLe3gqWt439u", bitcoin.networks.bitcoin);        
    console.log(key);
    let tx = new bitcoin.TransactionBuilder();
    tx.addInput("87f062644e830dd51d957229b3804cbceacf609a8cb84f149e5b5948cc58d776", 0);        
    tx.addOutput("17g8ZgE1JvXtkZ9De8RSmT4kvQWuuEBFcQ", parseInt(30000 - fee*satoshis))     
    tx.addOutput("1PZMjF7DjunU1ib7c1Ci7CYCs2ZZhybuoV", parseInt(37697))
    const signed = tx.sign(0, key)
    console.log(signed);
    console.log("before");
    let raw = tx.build().toHex();
    console.log(raw);
    console.log("after");
    try {
        const response = await bnet.api.broadcast(raw);
        console.log(response);
    } catch(error) {
        console.log(error)
    }
    
}

export const createWallet = (mnemonics, name, password) => {        
    const seed = bip39.mnemonicToSeed(mnemonics);                
    const master = bitcoin.HDNode.fromSeedBuffer(seed, bnet.current);
    const derived = master.derivePath(BitcoinWallet.Defaults.Path);                        
    const address = derived.getAddress();                
    return new Wallet({
        name: name,
        address: address,
        password: password,
        network: bnet.name,
        seed: Hasher.encrypt(seed, password),
        xpub: Hasher.encrypt(derived.neutered().toBase58(), password)
    });        
}

export const  usedAddressesList = async (xpub) => {

    const master = bitcoin.HDNode.fromBase58(xpub);
    let index = 0;
    
    while(true) {
        const derived = master.derive(0).derive(index);
        // const derived = master.derivePath("0'")    
        
        const address = derived.getAddress();
        
        if (index === 100) {
            break;
        }
        index++;
    }
}

BitcoinWallet.Defaults = {
    Encryption: 'aes-256-cbc',
    Path: "m/0'",
    DBFileName: 'wallets',
};

BitcoinWallet.Events = {
    Updated: 'updated',
};

export default BitcoinWallet;