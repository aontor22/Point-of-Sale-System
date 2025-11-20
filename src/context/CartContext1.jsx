// src/context/CartContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    // items: { [key]: { key, name, price, imageSrc, quantityLabel, stock, qty } }
    const [items, setItems] = useState({});

    // add/remove from product card (just toggle presence)
    const toggleItem = (product) => {
        const key = product.key || product.name;

        setItems((prev) => {
            if (prev[key]) {
                // remove completely
                const { [key]: _removed, ...rest } = prev;
                return rest;
            }
            // add with qty = 1
            return {
                ...prev,
                [key]: {
                    key,
                    name: product.name,
                    price: Number(product.price) || 0,
                    imageSrc: product.imageSrc,
                    quantityLabel: product.quantity, // like "25 Pcs"
                    stock: product.stock,            // optional
                    qty: 1,
                },
            };
        });
    };

    const incrementQty = (key) => {
        setItems((prev) => {
            if (!prev[key]) return prev;
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    qty: prev[key].qty + 1,
                },
            };
        });
    };

    const decrementQty = (key) => {
        setItems((prev) => {
            const item = prev[key];
            if (!item) return prev;

            if (item.qty > 1) {
                return {
                    ...prev,
                    [key]: {
                        ...item,
                        qty: item.qty - 1,
                    },
                };
            }

            // qty would become 0 ⇒ remove row
            const { [key]: _removed, ...rest } = prev;
            return rest;
        });
    };

    const removeItem = (key) => {
        setItems((prev) => {
            const { [key]: _removed, ...rest } = prev;
            return rest;
        });
    };

    const value = useMemo(
        () => ({
            items,
            toggleItem,
            incrementQty,
            decrementQty,
            removeItem,
        }),
        [items]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
