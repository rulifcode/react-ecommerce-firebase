import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);

    const unsubscribe = onSnapshot(collection(db, "product"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const filtered = allProducts.filter((p) => storedFavorites.includes(p.id));
      setProducts(filtered);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>❤️ Wishlist</h2>
      {products.length === 0 ? (
        <p>Belum ada produk favorit.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
