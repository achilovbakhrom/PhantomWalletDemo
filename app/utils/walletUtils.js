import bip39 from 'react-native-bip39';
import bitcoin from 'react-native-bitcoinjs-lib';


export const generateMnemonics = () => bip39.generateMnemonic(); 

export const getXPub = (mnemonics, network, derivedPath) => {    
    const seed = bip39.mnemonicToSeed(mnemonics);                
    const master = bitcoin.HDNode.fromSeedBuffer(seed, network);
    const derived = master.derivePath(derivedPath);                        
    return derived.neutered().toBase58();        
};
