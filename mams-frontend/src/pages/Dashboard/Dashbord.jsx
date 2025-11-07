import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const [data] = useState({
        openingBalance: 1200,
        purchases: 300,
        transferIn: 150,
        transferOut: 100,
        assignedAssets: 800,
        expendedAssets: 120,
    });

    const [filters, setFilters] = useState({
        date: "",
        base: "",
        equipmentType: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const netMovement = data.purchases + data.transferIn - data.transferOut;
    const closingBalance = data.openingBalance + netMovement;

    return (
        <div
            className="container-fluid min-vh-100 py-4"
            style={{
                backgroundColor: "#2c2c2c",
                color: "#f0f0f0",
                fontFamily: "Poppins, sans-serif",
            }}
        >
            <h3 className="text-center mb-4" style={{ color: "#f8f9fa" }}>
                📊 Asset Dashboard
            </h3>

            {/* Filters */}
            <div
                className="card p-3 mb-4 shadow-sm"
                style={{
                    backgroundColor: "#212529",
                    borderRadius: "10px",
                    border: "1px solid #3a3a3a",
                    color: "#eaeaea",
                }}
            >
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-semibold text-light">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                            style={{
                                backgroundColor: "#343a40",
                                color: "#fff",
                                border: "1px solid #444",
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-semibold text-light">
                            Base
                        </label>
                        <select
                            className="form-select"
                            name="base"
                            value={filters.base}
                            onChange={handleFilterChange}
                            style={{
                                backgroundColor: "#343a40",
                                color: "#fff",
                                border: "1px solid #444",
                            }}
                        >
                            <option value="">Select Base</option>
                            <option value="Alpha">Base Alpha</option>
                            <option value="Bravo">Base Bravo</option>
                            <option value="Charlie">Base Charlie</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-semibold text-light">
                            Equipment Type
                        </label>
                        <select
                            className="form-select"
                            name="equipmentType"
                            value={filters.equipmentType}
                            onChange={handleFilterChange}
                            style={{
                                backgroundColor: "#343a40",
                                color: "#fff",
                                border: "1px solid #444",
                            }}
                        >
                            <option value="">Select Type</option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Weapons">Weapons</option>
                            <option value="Electronics">Electronics</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="row g-4 text-center">
                {[
                    {
                        label: "Opening Balance",
                        value: data.openingBalance,
                        color: "#0d6efd",
                    },
                    {
                        label: "Closing Balance",
                        value: closingBalance,
                        color: "#198754",
                    },
                    {
                        label: "Net Movement",
                        value: netMovement,
                        color: "#fd7e14",
                        clickable: true,
                    },
                    {
                        label: "Assigned Assets",
                        value: data.assignedAssets,
                        color: "#6f42c1",
                    },
                    {
                        label: "Expended Assets",
                        value: data.expendedAssets,
                        color: "#dc3545",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`col-md-${item.label === "Assigned Assets" || item.label === "Expended Assets"
                            ? "6"
                            : "4"
                        }`}
                    >
                        <div
                            className="card h-100"
                            style={{
                                backgroundColor: "#1f1f1f",
                                border: `1px solid #3a3a3a`,
                                borderTop: `4px solid ${item.color}`,
                                color: "#f1f1f1",
                                transition: "all 0.2s ease-in-out",
                                cursor: item.clickable ? "pointer" : "default",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#292929")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#1f1f1f")
                            }
                            onClick={
                                item.clickable ? () => setShowModal(true) : undefined
                            }
                        >
                            <div className="card-body">
                                <h6
                                    className="text-secondary"
                                    style={{ letterSpacing: "0.5px" }}
                                >
                                    {item.label}
                                </h6>
                                <h4
                                    className="fw-bold"
                                    style={{ color: item.color, marginTop: "8px" }}
                                >
                                    {item.value}
                                </h4>
                                {item.clickable && (
                                    <small className="text-muted">
                                        Click for details
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Net Movement Details */}
            {showModal && (
                <div
                    className="modal show fade"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.75)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content"
                            style={{
                                backgroundColor: "#212529",
                                color: "#f1f1f1",
                                border: "1px solid #444",
                            }}
                        >
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">Net Movement Details</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <strong>Purchases:</strong> {data.purchases}
                                </p>
                                <p>
                                    <strong>Transfer In:</strong> {data.transferIn}
                                </p>
                                <p>
                                    <strong>Transfer Out:</strong> {data.transferOut}
                                </p>
                                <hr className="border-secondary" />
                                <p>
                                    <strong>Net Movement:</strong> {netMovement}
                                </p>
                            </div>
                            <div className="modal-footer border-secondary">
                                <button
                                    className="btn btn-outline-light"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
