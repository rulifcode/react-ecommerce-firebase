import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OrdersProvider } from "./contexts/OrdersContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <OrdersProvider> {/* ⬅️ Bungkus di sini */}
        <CartProvider>
          <App />
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
