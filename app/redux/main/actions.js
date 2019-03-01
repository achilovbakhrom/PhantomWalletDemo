import {MNEMONICS_GENERATED, BITCOIN_BALANCE_CALCUATED} from './constants';
import {generateMnemonics} from '../../utils/walletUtils';
import BitcoinWallet, {getTransactionsList, sendTransaction, getBalanceForMnemonics} from '../../domains/bitcoin';

export const generateMnemonicsAction = () => {
    return async (dispatch) => {
        const mnemonics = generateMnemonics();
        const xpub = 'xpub69VALARCTZ12pptZKtmCvUmDkgwd9TLn69cR8mSSfLJUyeA3hvevnTd4hwQ5BzHyDrE9ao9zfkUBkPgJsyC5H1z336AhTw9L72M7TiYoXG5'        
        sendTransaction()        
        dispatch({
            type: MNEMONICS_GENERATED,
            payload: mnemonics
        })    
    }
};

export const getBalanceAction = (mnemonics) => {
    return async (dispatch) => {
        const balance = await getBalanceForMnemonics(mnemonics);
        console.log(balance)
        dispatch({
            type: BITCOIN_BALANCE_CALCUATED,
            payload: balance
        })
    }
}
