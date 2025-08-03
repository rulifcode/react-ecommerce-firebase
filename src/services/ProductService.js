// src/firebase/services/ProductService.js
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config";

export const getAllProducts = async () => {
  try {
    const productRef = collection(db, "products");
    const snapshot = await getDocs(productRef);
    
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};