import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext();
export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const fetchOrders = async () => {
    if (!currentUser) return;
    setOrdersLoading(true);
    try {
      const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (err) {
      console.error("Gagal fetch orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading || !currentUser) return;
    fetchOrders();
  }, [currentUser, authLoading]);

  return (
    <OrdersContext.Provider value={{ orders, ordersLoading, refreshOrders: fetchOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};
