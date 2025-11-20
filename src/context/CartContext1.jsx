import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState({});

    const toggleItem = (product) => {
        const key = product.key || product.name;

        setItems((prev) => {
            if (prev[key]) {
                const { [key]: _removed, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [key]: {
                    key,
                    name: product.name,
                    price: Number(product.price) || 0,
                    imageSrc: product.imageSrc,
                    quantityLabel: product.quantity,
                    stock: product.stock,
                    qty: 1,
                },
            };
        });
    };

    const incrementQty = (key) => {
        setItems((prev) => {
            const item = prev[key];
            if (!item) return prev;
            return {
                ...prev,
                [key]: { ...item, qty: item.qty + 1 },
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
                    [key]: { ...item, qty: item.qty - 1 },
                };
            }

            // if qty would go to 0, remove row
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