import React from "react";

const AdminHeader = ({ name, order }) => {
    return (
        <div className="new text-center align-items-center justify-content-around mb-5">
            <h2 className="text-4xl font-bold">Welcome {name}</h2>
            <p>
                You have{" "}
                <span className="text-blue-500 font-bold">{order}</span> Orders, Today.
            </p>
        </div>
    );
};

export default AdminHeader;
