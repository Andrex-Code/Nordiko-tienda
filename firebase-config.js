// ============================================
// NØRDIKO — CONFIGURACIÓN DE FIREBASE
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCd0LgzS2i4CK8msWo00YItiCYZ_dG6Ngs",
  authDomain: "nordiko-tienda.firebaseapp.com",
  projectId: "nordiko-tienda",
  storageBucket: "nordiko-tienda.firebasestorage.app",
  messagingSenderId: "56736452687",
  appId: "1:56736452687:web:8e954aad37c03b70151a3a",
  measurementId: "G-YLJT5229L0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productosCollection = collection(db, "productos");
const configCollection = collection(db, "config");

export { db, productosCollection, configCollection, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteDoc, doc };
