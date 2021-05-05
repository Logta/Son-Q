import { auth } from '../plugins/firebase'

type Auth = {
    ok: boolean,
    id: string,
    name: string,
}

const awaitOnAuth = ():Promise<Auth> => {
    return new Promise(function(resolve, reject) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve ({
                    ok: true,
                    id: user.uid, 
                    name: user.displayName
                })
            } else {
                reject ({
                    ok: false,
                    id: "", 
                    name: ""
                })
            }
        });  
    })
}

export {awaitOnAuth}