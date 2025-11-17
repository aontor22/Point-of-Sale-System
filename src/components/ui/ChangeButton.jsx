import React from "react";

const ButtonComponent = ({ title, icon, isVisible = true, onClick, className = "" }) => {
    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className={`
        inline-flex items-center justify-center
        h-10 px-4 rounded-sm
        text-sm font-medium
        whitespace-nowrap
        ${className}`}
        >
            {icon}
            {title}
        </button>
    );
};

export default ButtonComponent;
