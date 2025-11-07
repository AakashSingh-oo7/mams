import React from 'react';
import Menubar from "./components/Menubar/Menubar.jsx";
import Dashbord from "./pages/Dashboard/Dashbord.jsx";
import ManageAssets from "./pages/ManageAssets/ManageAssets.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import Transfer from "./pages/Transfer/Transfer.jsx";
import Purchase from "./pages/Purchase/Purchase.jsx";
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";

const App = () => {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/login" && <Menubar />}
            <Toaster />
            <Routes>
                <Route path="/dashbord" element={<Dashbord />} />
                <Route path="/category" element={<ManageAssets />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Purchase />} />
            </Routes>

        </div>
    );
};

export default App;
