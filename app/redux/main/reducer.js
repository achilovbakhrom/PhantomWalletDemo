import {MNEMONICS_GENERATED, BITCOIN_BALANCE_CALCUATED} from './constants';

const initialState = {
    mnemonics: ''
}

const mainReducer = (state=initialState, action) => {
    switch(action.type) {
        case MNEMONICS_GENERATED:
            return {...state, mnemonics: action.payload}
        case BITCOIN_BALANCE_CALCUATED:
            return {...state, bitcoinBalance: action.payload}
        default: 
            return state
    }
}

export default mainReducer;
