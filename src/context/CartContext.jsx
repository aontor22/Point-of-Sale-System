import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState({});

    const toggleItem = (product) => {
        const key = product.key || product.name;

        setItems((prev) => {
            if (prev[key]) {
                const { [key]: _, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [key]: { ...product, key },
            };
        });
    };

    const value = useMemo(
        () => ({
            items,
            toggleItem,
        }),
        [items]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return ctx;
}
