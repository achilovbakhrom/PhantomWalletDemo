
class Wallet {
    constructor(info) {
        const {name, address, network, password, encryptedSeed} = info;
        this.__name = name;
        this.__password = password;
        this.__encryptedSeed = encryptedSeed;
        this.__address = address;
        this.__network = network;
    }

    get name() {
        return this.__name;
    }

    set name (name) {
        this.__name = name;
    }

    get password() {
        return this.__password;
    }

    set password(password) {
        this.__password = password;
    }

    get seed() {
        return this.__encryptedSeed;
    }

    set seed(encryptedSeed) {
        this.__encryptedSeed = encryptedSeed;
    }

    get network() {
        return this.__address.__network;
    }

    set network(network) {
        this.__network = network;
    }

    get address() {
        return this.__address;
    }

    set address(address) {
        this.__address = address;
    }
}