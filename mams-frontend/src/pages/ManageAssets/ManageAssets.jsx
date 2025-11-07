import React from 'react';
import "./ManageAssets.css"
import AssetsForm from "../../components/AssetsForm/AssetsForm.jsx";
import AssetsList from "../../components/AssetsList/AssetsList.jsx";

const ManageAssets = () => {
    return (
        <div className="category-container text-light">
            <div className="left-column">
                <AssetsForm />
            </div>
            <div className="right-column">
                <AssetsList />
            </div>
        </div>

    );
};

export default ManageAssets;