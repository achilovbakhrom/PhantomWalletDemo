import {generateMnemonics} from '../app/utils/walletUtils';


it('xpub', async () => {
    // const mnemonics = 'project nasty dose grunt ritual price gap prison degree agent satisfy across';
    // const seed = bip39.mnemonicToSeed(mnemonics);                
    // const master = bitcoin.HDNode.fromSeedBuffer(seed, 'testnet');
    // const derived = master.derivePath("m/0'");                                
    // const xpub = derived.neutered().toBase58()
    // console.log(xpub);
    // const wallet = BitcoinWallet.createWallet(mnemonics, 'test', 'password')
    
    console.log(generateMnemonics())
    expect(1).toEqual(1);
})