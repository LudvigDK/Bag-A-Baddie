import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCmjvm1duQeqh9G-P5BqQR8ev-W00J4Yjs",
  authDomain: "bag-a-baddie.firebaseapp.com",
  projectId: "bag-a-baddie",
  storageBucket: "bag-a-baddie.firebasestorage.app",
  messagingSenderId: "230030096772",
  appId: "1:230030096772:web:84f2ae6ee2347cdae005d1"
};

const app = initializeApp(firebaseConfig)



const db = getFirestore(app)

async function submitScore(name, score, time, messages) {
    await addDoc(collection(db, "highscores"), {
        name: name,
        score: score,
        time: time,
        messages: messages;

        timestamp: Date.now()
    })
}

async function getHighscores() {
    const q = query(
        collection(db, "highscores"),
        orderBy("score", "desc"),
        limit(10)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => doc.data())
}