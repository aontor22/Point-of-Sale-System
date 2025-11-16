import React from 'react';

const ButtonComponent = ({ title, isVisible, onClick, className }) => {
    if (!isVisible) return null; // If the button should not be visible, return null

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-medium text-sm ${className}`}
        >
            {title}
        </button>
    );
};

export default ButtonComponent;
