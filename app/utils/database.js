import Datastore from 'react-native-local-mongodb';

class Database {

    constructor(name) {
        this.db = new Datastore({ filename: `./db/${name}.db`, autoload: true });
    }

    find(cond) {
        return new Promise((res, rej) => {
            this.db.find(cond || {}, (err, docs) => {
                if (err) rej(err);
                res(docs);
            });
        });
    }

    findAll() {
        return new Promise((res, rej) => {
            this.db.find({}, (error, docs) => {
                if (error) rej(error);
                res(docs);
            })
        });
    }

    insert(obj) {
        return new Promise((res, rej) => {
            this.db.insert(obj, (err) => {
                if (err) rej(err);
                res(obj);
            });
        });
    }

    remove(cond) {
        return new Promise((res, rej) => {
            this.db.remove(cond, (err) => {
                if (err) rej(err);
                res();
            });
        });
    }

}

const BitcoinDatabase = new Database('bitcoin');
const NEMDatabase = new Database('nem');
const EthereumDatabase = new Database('ethereum');
const RippleDatabase = new Database('ripple');
const BitcoinXPubIndexDatabase = new Database('bitcoin_xpub_index')

export default {
    bitcoinDb: BitcoinDatabase,
    nemDb: NEMDatabase,
    ethtereumDb: EthereumDatabase,
    rippleDb: RippleDatabase  ,
    bitcoinXPubIndexDb: BitcoinXPubIndexDatabase  
};