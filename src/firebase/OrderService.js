import {
  collection,
  addDoc,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// Simpan pesanan + kurangi stok produk secara aman
export const saveOrder = async (
  userId,
  items,
  total = 0,
  extra = {} // tambahan seperti address, phone, email, paymentMethod
) => {
  try {
    await runTransaction(db, async (transaction) => {
      for (const item of items) {
        const productRef = doc(db, "product", item.id);
        const productDoc = await transaction.get(productRef);

        if (!productDoc.exists()) {
          throw new Error(`Produk '${item.name}' tidak ditemukan.`);
        }

        const currentStock = productDoc.data().stok;
        if (currentStock < item.quantity) {
          throw new Error(`Stok tidak cukup untuk '${item.name}'. Tersisa: ${currentStock}`);
        }

        // Kurangi stok
        transaction.update(productRef, {
          stok: currentStock - item.quantity,
        });
      }

      // Simpan pesanan dengan detail tambahan
      await addDoc(collection(db, "orders"), {
        userId,
        items,
        total,
        createdAt: serverTimestamp(),
        ...extra, // berisi address, phone, email, paymentMethod
      });
    });
  } catch (error) {
    console.error("❌ Gagal menyimpan pesanan:", error);
    throw error;
  }
};
