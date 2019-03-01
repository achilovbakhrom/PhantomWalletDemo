
import axios from 'axios';

class Network {
    
    get(url, params) {
        return new Promise((res, rej) => {
            axios.get(url, params) 
                .then((response) => { res(response) })
                .catch((error) => { rej(error) })
        })
    }

    post(url, body) {
        return new Promise((res, rej) => {
            axios.post(url, body)
                .then((response) => { res(response) })
                .catch((error) => { rej(error) })
        })
    }
    
    delete(url, body) {
        return new Promise((res, rej) => {
            axios.delete(url, body)
                .then((response) => { res(response) })
                .catch((error) => { rej(error) })
        })
    }

    put(url, body) {
        return new Promise((res, rej) => {
            axios.delete(url, body)
                .then((response) => { res(response)})
                .catch((error) => { rej(error) })
        })
    }
}

const instance = new Network()

export default instance;