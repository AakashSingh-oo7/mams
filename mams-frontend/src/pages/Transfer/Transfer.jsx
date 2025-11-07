import React from 'react';
import './Transfer.css'
import TransferForm from "../../components/TransferForm/TransferForm.jsx";
import TransferList from "../../components/TranferList/TransferList.jsx";

const Transfer = () => {
    return (
        <div className="Transfer-container text-light">
            <div className="left-column">
                <TransferForm />
            </div>
            <div className="right-column">
                <TransferList />
            </div>
        </div>
    );
};

export default Transfer;