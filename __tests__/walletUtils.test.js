import { generateMnemonics } from '../app/utils/wallet/walletUtils';

test('generateMnemonic function', async () => {
    console.log('test');
    const mnemonics = await generateMnemonics();
    console.log(mnemonics);
    expect(mnemonics).not.toBeNull()
});