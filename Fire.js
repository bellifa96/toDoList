import firebase from "firebase"
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyAoBWcE9CiQ4Wru1OJrc5_byl5qbMOchho',
    authDomain: 'todolist-a173d.firebaseapp.com',
    projectId: 'todolist-a173d',
    storageBucket: 'todolist-a173d.appspot.com',
    messagingSenderId: '935541136783',
    appId: '1:935541136783:web:64ba0ab47daf4d992efffa',
}

export default class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null)
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }

    get ref() {
        return firebase.firestore().collection('lists')
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name')
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = []
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })
            callback(lists)
        }, error => {
            console.error(error)
        })
    }

    async addList(list) {
        const ref = this.ref
        await ref.add(list)

    }

    async deleteList(list) {
        const ref = this.ref
        await ref.doc(list.id).delete()
    }

    async updateList(list) {
        const ref = this.ref
        await ref.doc(list.id).update(list)
    }

    detach() {
        this.unsubscribe()
    }
}