import nem from '@coincrowd/react-native-nem-sdk';

export const getBalance = async (address) => {
    const balance = await nem.getBalance(address);
    return balance;
}

export const getTransactions = async (address) => {
    const txs = await nem.getTransactions(address);
    return txs;
}

export const sendTransaction = async (privKey, destinationAddress, amount, message) => {
    nem.setPrivateKey(privKey)
    await nem.send(destinationAddress, amount, message)
}